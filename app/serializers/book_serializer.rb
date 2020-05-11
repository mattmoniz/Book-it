class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :isbn, :img_url, :user



  has_many :libraries
end
