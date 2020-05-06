class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.text :description
      t.string :isbn

      t.timestamps
    end
    add_index :books, :isbn, unique: true
  end
end
