class CreateLibrary < ActiveRecord::Migration[5.2]
  def change
    create_table :libraries do |t|
      t.boolean :wishlist_flag

      t.belongs_to :user, null: false
      t.belongs_to :book, null: false

      t.timestamps
    end
  end
end
