class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :admin

  has_many :libraries
end
