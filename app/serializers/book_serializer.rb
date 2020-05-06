class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :isbn

has_many :libraries
end
