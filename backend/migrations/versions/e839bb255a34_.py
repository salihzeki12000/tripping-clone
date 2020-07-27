"""empty message

Revision ID: e839bb255a34
Revises: 
Create Date: 2020-07-27 16:05:24.707461

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e839bb255a34'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('room_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('area', sa.String(length=100), nullable=False),
    sa.Column('room_type', sa.String(length=100), nullable=True),
    sa.Column('bedroom', sa.Integer(), nullable=True),
    sa.Column('total_room', sa.Integer(), nullable=True),
    sa.Column('bathroom', sa.Integer(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('guest', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('hotels', sa.Column('room_details', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'hotels', 'room_details', ['room_details'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'hotels', type_='foreignkey')
    op.drop_column('hotels', 'room_details')
    op.drop_table('room_details')
    # ### end Alembic commands ###
