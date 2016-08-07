class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :title, null: false
      t.string :description
      t.integer :genre_id, null: false

      t.timestamps null: false
    end
    add_index :stories, :genre_id
    add_index :stories, :title
  end
end
