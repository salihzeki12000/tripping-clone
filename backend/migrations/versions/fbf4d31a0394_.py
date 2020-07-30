"""empty message

Revision ID: fbf4d31a0394
Revises: 
Create Date: 2020-07-30 09:11:56.182983

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbf4d31a0394'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('property',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_name', sa.String(length=255), nullable=True),
    sa.Column('image', sa.JSON(), nullable=True),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('accomodation_type', sa.String(length=100), nullable=True),
    sa.Column('free_cancellation', sa.Boolean(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('aminities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('pool', sa.Boolean(), nullable=True),
    sa.Column('internet', sa.Boolean(), nullable=True),
    sa.Column('tv', sa.Boolean(), nullable=True),
    sa.Column('parking', sa.Boolean(), nullable=True),
    sa.Column('air_conditioning', sa.Boolean(), nullable=True),
    sa.Column('kitchen', sa.Boolean(), nullable=True),
    sa.Column('pet_allowed', sa.Boolean(), nullable=True),
    sa.Column('smoking', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('property_id')
    )
    op.create_table('booking',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('booked_at', sa.DateTime(), nullable=True),
    sa.Column('total_guest', sa.Integer(), nullable=True),
    sa.Column('booking_date', sa.DateTime(), nullable=True),
    sa.Column('amount_paid', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.String(length=255), nullable=True),
    sa.Column('payment_id', sa.String(length=255), nullable=True),
    sa.Column('is_cancelled', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('location',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('country', sa.String(length=100), nullable=True),
    sa.Column('state', sa.String(length=100), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('locality', sa.String(length=255), nullable=True),
    sa.Column('longitude', sa.Float(precision='8,7'), nullable=True),
    sa.Column('latitude', sa.Float(precision='8,7'), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('property_id')
    )
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('review', sa.String(length=500), nullable=True),
    sa.Column('reviewed_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('room_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('area', sa.String(length=100), nullable=False),
    sa.Column('total_room', sa.Integer(), nullable=True),
    sa.Column('bathroom', sa.Integer(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('guest', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_o_auth',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('provider', sa.String(length=100), nullable=True),
    sa.Column('provider_id', sa.String(length=100), nullable=True),
    sa.Column('access_token', sa.String(length=256), nullable=True),
    sa.Column('image_url', sa.String(length=256), nullable=True),
    sa.Column('expired_in', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_o_auth')
    op.drop_table('room_details')
    op.drop_table('review')
    op.drop_table('location')
    op.drop_table('booking')
    op.drop_table('aminities')
    op.drop_table('users')
    op.drop_table('property')
    # ### end Alembic commands ###
