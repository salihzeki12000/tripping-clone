"""empty message

Revision ID: e37b400445bf
Revises: 503e7994a5ef
Create Date: 2020-07-24 15:42:45.927447

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e37b400445bf'
down_revision = '503e7994a5ef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('aminities', sa.Column('room_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'aminities', 'room_details', ['room_id'], ['id'])
    op.add_column('location', sa.Column('district', sa.String(length=100), nullable=True))
    op.drop_column('location', 'city')
    op.drop_constraint('room_details_ibfk_1', 'room_details', type_='foreignkey')
    op.drop_column('room_details', 'aminities')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('room_details', sa.Column('aminities', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('room_details_ibfk_1', 'room_details', 'aminities', ['aminities'], ['id'])
    op.add_column('location', sa.Column('city', mysql.VARCHAR(length=100), nullable=True))
    op.drop_column('location', 'district')
    op.drop_constraint(None, 'aminities', type_='foreignkey')
    op.drop_column('aminities', 'room_id')
    # ### end Alembic commands ###