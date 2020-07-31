from ..models import db
from ..models.BookingModel import Booking
import json
import datetime
from flask import jsonify 
import razorpay
import hmac
import hashlib
import random
from twilio.rest import Client
from threading import Timer
import time
import smtplib  
import email.utils
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# send email from aws smtp
def send_email():
    SENDER = 'gunjan6788@gmail.com'  
    SENDERNAME = 'Tripping rent property website'

    RECIPIENT  = 'gunjanmahajan6788@gmail.com'

    # Replace smtp_username with your Amazon SES SMTP user name.
    USERNAME_SMTP = "ses-smtp-user.20200731-111127"

    # Replace smtp_password with your Amazon SES SMTP password.
    PASSWORD_SMTP = "AKIAQULGPBG3Z56V6B2D,BErIMYwjVCB3hrZgBAg48DtyephkeVV5sJ+SM2z4Mhdi"

    HOST = "email-smtp.us-east-1.amazonaws.com"
    PORT = 587

    # The subject line of the email.
    SUBJECT = 'Bill of Tripping.com'

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("Bill of booking through tripping.com"
                "This email was sent through the tripping.com "
                )

    # The HTML body of the email.
    HTML = """<html>
    <head></head>
    <body>
    <h1>Total Bill</h1>
    <p>Booking Date: '%s' To '%s'</p>
    <p>Booking amount: %d </p>
    <p>Total guest: %d</p>
    <p>Order id: '%s'</p>
    </body>
    </html>"""

    BODY_HTML = HTML % ("2020-08-01", "2020-08-03", 3000, 2, "order_FKpDSkE84Nar4r")

    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = SUBJECT
    msg['From'] = email.utils.formataddr((SENDERNAME, SENDER))
    msg['To'] = RECIPIENT
    # Comment or delete the next line if you are not using a configuration set
    #msg.add_header('X-SES-CONFIGURATION-SET',CONFIGURATION_SET)

    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(BODY_TEXT, 'plain')
    part2 = MIMEText(BODY_HTML, 'html')

    # Attach parts into message container.
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    msg.attach(part1)
    msg.attach(part2)

    # Try to send the message.
    try:  
        server = smtplib.SMTP(HOST, PORT)
        server.ehlo()
        server.starttls()
        #stmplib docs recommend calling ehlo() before & after starttls()
        server.ehlo()
        server.login(USERNAME_SMTP, PASSWORD_SMTP)
        server.sendmail(SENDER, RECIPIENT, msg.as_string())
        server.close()
    # Display an error message if something goes wrong.
    except Exception as e:
        print ("Error: ", e)
    else:
        print ("Email sent!")


#create otp for first time
otp = random.randint(1000,9999)
# change the otp after some time using therading
def change_otp(*args):
    global otp
    otp = random.randint(1000,9999)
    return otp

r = Timer(30.0,change_otp)


# create otp message
def get_mobile_otp(no):
    r.start()

    account_sid = "ACca1b6a88ec9fe84c5fafb1c7476d3453"
    auth_token = "460a0d10053eaa2c4ba870dc187e4243"

    client = Client(account_sid, auth_token)

    client.messages.create(
        body="Your Tripping verification code is: %s"%(str(otp)),
        from_="+13016059121",
        to="+"+"%s"%(no)
    )

    return 'otp sent'


# verify otp 
def varify_mobile_otp(no):
    global otp

    if otp == int(no):
        send_email()
        return 'verified'
    else:
        return 'you have entered wrong otp'


# sending booking msg 
def send_booking_msg(data,property_name):
    order_id = data['razorpay_order_id']
    amount = int(data['amount'])
    guest = int(data['guest'])
    check_in = datetime.datetime.strptime(data['booking_date'][0], "%Y-%m-%d")
    check_out = datetime.datetime.strptime(data['booking_date'][1], "%Y-%m-%d")
    
    account_sid = "ACca1b6a88ec9fe84c5fafb1c7476d3453"
    auth_token = "460a0d10053eaa2c4ba870dc187e4243"

    client = Client(account_sid, auth_token)

    client.messages.create(
        body="Your Tripping.com booking is confirmed: \
            order id =%s, amount paid = %d, guest=%d, \
            check_in = %s , check_out=%s"%(order_id, amount,guest,check_in,check_out ),
        from_="+13016059121",
        to="+919545847906"
    )
    return 'message sent'



# razorpay validateion functions
# generate the order id
def order_id(booking_data):
    client = razorpay.Client(auth=("rzp_test_deyJ8kZP9d4HEh", "wzbh6WZvPXOY2MUsjD4uaZ8T"))
    
    res = client.order.create(data=booking_data)

    return json.dumps(res)

# validate the signature
def varification(validate_data):
    secret = 'wzbh6WZvPXOY2MUsjD4uaZ8T'
    secret_key = bytes(secret, 'utf-8')
    msg = bytes(validate_data['razorpay_order_id'] + "|" + validate_data['razorpay_payment_id'], 'utf-8')
    dig = hmac.new(key=secret_key,msg=msg,digestmod=hashlib.sha256)
    generated_signature = dig.hexdigest()

    start = datetime.datetime.strptime(validate_data['booking_date'][0], "%Y-%m-%d")
    end = datetime.datetime.strptime(validate_data['booking_date'][1], "%Y-%m-%d")
    date_diff =  (end-start).days
    booking_date = datetime.datetime.strptime(validate_data['booking_date'][0], "%Y-%m-%d")

    if generated_signature == validate_data['razorpay_signature']:
        for i in range(int(date_diff)):
            book = Booking(
                property_id=validate_data['property_id'],
                total_guest=validate_data['guest'],
                booking_date=booking_date + datetime.timedelta(days=i),
                amount_paid=validate_data['amount'],
                order_id=validate_data['razorpay_order_id'],
                payment_id=validate_data['razorpay_payment_id'],
                is_cancelled=0
            )

            db.session.add(book)
            db.session.commit()
        
        property_name = db.session.execute('''SELECT property_name 
                    FROM property WHERE id=%d'''%(int(validate_data['property_id']))).first()
        time.sleep(1)
        send_booking_msg(validate_data, property_name)

        return{
            "status":"success",
            "message":"payment successfull"
        }
    else:
        return {
            "status":"failiure",
            "message":"payment unsuccessfull"
        }


