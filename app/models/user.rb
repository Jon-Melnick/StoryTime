# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :username, :session_token, presence: true
  validates :email, :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :teams, #method_name, ends with s
    primary_key: :id, #typically id
    foreign_key: :user_id, #column_name_id
    class_name: 'Writer' #class_name ex. (String)

  has_many :stories, #method name
    through: :teams,
    source: :story

  has_many :connections, #method_name, ends with s
    primary_key: :id, #typically id
    foreign_key: :requester_id, #column_name_id
    class_name: 'Friendship' #class_name ex. (String)

  has_many :pending_connections, #method_name, ends with s
    primary_key: :id, #typically id
    foreign_key: :receiver_id, #column_name_id
    class_name: 'Friendship' #class_name ex. (String)

  has_many :friends, #method name
    through: :connections,
    source: :receiver

  has_many :sections, #method_name, ends with s
    primary_key: :id, #typically id
    foreign_key: :user_id, #column_name_id
    class_name: 'Section' #class_name ex. (String)

  def pending_relationships
    connections.where(status: 'pending').map(&:friend_info)
  end

  def pending_ids
    connections.where(status: 'pending').map(&:receiver_id)
  end

  def friendships_old
    connections.where(status: 'friends').map(&:friend_info)
  end

  def friendships
    pending_connections.where.not(requester_id: pending_ids).map(&:requester_info)
  end

  def storyIds
    stories.map(&:storyId)
  end



  def self.find_by_credentials(identifier, password)
    user = User.find_by(identifier)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
