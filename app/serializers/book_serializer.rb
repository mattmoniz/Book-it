class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :isbn, :img_url, :user

  # , :user

  # def user
  #   if scope
  #     {id: scope.id, email: scope.email}
  #   else
  #     {id: nil, email: nil}
  #   end
  # end

  has_many :libraries
end
