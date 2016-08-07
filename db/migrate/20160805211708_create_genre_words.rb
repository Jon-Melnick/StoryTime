class CreateGenreWords < ActiveRecord::Migration
  def change
    create_table :genre_words do |t|
      t.integer :genre_id, null: false
      t.integer :word_id, null: false

      t.timestamps null: false
    end
    add_index :genre_words, :genre_id
    add_index :genre_words, :word_id
  end
end
