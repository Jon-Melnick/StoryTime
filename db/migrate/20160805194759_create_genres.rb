class CreateGenres < ActiveRecord::Migration
  def change
    create_table :genres do |t|
      t.string :genre_type, null: false
      t.string :genre_tab_url, null: false
      t.string :genre_background_url, null: false

      t.timestamps null: false
    end
    add_index :genres, :genre_type

  end
end
