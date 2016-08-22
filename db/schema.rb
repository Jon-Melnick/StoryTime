# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160821210207) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendships", force: :cascade do |t|
    t.integer  "requester_id",                     null: false
    t.integer  "receiver_id",                      null: false
    t.string   "status",       default: "pending", null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "friendships", ["requester_id", "receiver_id"], name: "index_friendships_on_requester_id_and_receiver_id", unique: true, using: :btree

  create_table "genre_words", force: :cascade do |t|
    t.integer  "genre_id",   null: false
    t.integer  "word_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "genre_words", ["genre_id"], name: "index_genre_words_on_genre_id", using: :btree
  add_index "genre_words", ["word_id"], name: "index_genre_words_on_word_id", using: :btree

  create_table "genres", force: :cascade do |t|
    t.string   "genre_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "genres", ["genre_type"], name: "index_genres_on_genre_type", using: :btree

  create_table "sections", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "story_id",   null: false
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "sections", ["story_id"], name: "index_sections_on_story_id", using: :btree
  add_index "sections", ["user_id"], name: "index_sections_on_user_id", using: :btree

  create_table "stories", force: :cascade do |t|
    t.string   "title",       null: false
    t.string   "description"
    t.integer  "genre_id",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "stories", ["genre_id"], name: "index_stories_on_genre_id", using: :btree
  add_index "stories", ["title"], name: "index_stories_on_title", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "username",        null: false
    t.string   "session_token",   null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "words", force: :cascade do |t|
    t.integer  "genre_id",   null: false
    t.string   "word",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "words", ["genre_id", "word"], name: "index_words_on_genre_id_and_word", unique: true, using: :btree

  create_table "writers", force: :cascade do |t|
    t.integer  "user_id",                 null: false
    t.integer  "story_id",                null: false
    t.string   "hand",       default: [],              array: true
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "writers", ["story_id"], name: "index_writers_on_story_id", using: :btree
  add_index "writers", ["user_id", "story_id"], name: "index_writers_on_user_id_and_story_id", unique: true, using: :btree
  add_index "writers", ["user_id"], name: "index_writers_on_user_id", using: :btree

end
