class User < ApplicationRecord
  
  has_many :runs
  has_many :charities, through: :runs
  validates :username, :email, presence: true
  validates :username, :email, uniqueness: true

  has_secure_password

  scope :most_distance, -> { joins(:runs).group(:id).order("distance").limit(1)}

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_initialize do |user|
      user.username = auth.info.name
      user.email = auth.info.email
      user.password = SecureRandom.hex
    end
  end

  def self.total_charity_runs(charity)
    joins(:runs).group(:charity_id).where('charity_id = ?', charity.id).order('count(*)').pluck('username').first 
  end

end

