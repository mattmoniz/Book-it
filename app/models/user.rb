class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :email, presence: true, uniqueness: true

  has_many :libraries
  has_many :books, through: :libraries

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


end
