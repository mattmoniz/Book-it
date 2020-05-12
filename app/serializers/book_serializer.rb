class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :authors, :description, :isbn, :img_url, :user

end
