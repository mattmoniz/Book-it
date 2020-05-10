class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :admin

  has_many :libraries
end
