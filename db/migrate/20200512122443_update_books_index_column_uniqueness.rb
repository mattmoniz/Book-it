class UpdateBooksIndexColumnUniqueness < ActiveRecord::Migration[5.2]
  def change
    remove_index :books, :isbn
    add_index :books, :isbn
  end
end
