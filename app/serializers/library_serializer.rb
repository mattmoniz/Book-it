class LibrarySerializer < ActiveModel::Serializer
  # attributes :id, :wishlist_flag

  belongs_to :book
  belongs_to :user
end
