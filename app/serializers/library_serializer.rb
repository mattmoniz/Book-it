class LibrarySerializer < ActiveModel::Serializer
  attributes :id, :wishlist_flag, :book

  belongs_to :user
  belongs_to :book
end
