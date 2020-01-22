class User < ApplicationRecord
    has_secure_password

    # has_many :follows, dependent: :destroy
    # has_many :reviews, dependent: :destroy
    # has_many :games, through: :reviews

    has_many :follows, dependent: :destroy
    has_many :games, through: :follows
    has_many :likes, dependent: :destroy
    has_many :reviews, through: :likes
    has_many :reviews, dependent: :destroy

    validates :username, presence: true
    validates :username, uniqueness: true
    validates :password_digest, presence: true 
    
end
