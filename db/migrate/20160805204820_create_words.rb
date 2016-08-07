class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.integer :genre_id, null: false
      t.string :word, null: false

      t.timestamps null: false
    end
    add_index :words, [:genre_id, :word], unique: true
  end
end
