"""empty message

Revision ID: 61cbc0e8484d
Revises: 8bdafb4e03e1
Create Date: 2020-07-24 16:01:43.610959

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '61cbc0e8484d'
down_revision = '8bdafb4e03e1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'aminities', ['room_id'])
    op.drop_index('room_type', table_name='room_details')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('room_type', 'room_details', ['room_type'], unique=True)
    op.drop_constraint(None, 'aminities', type_='unique')
    # ### end Alembic commands ###
