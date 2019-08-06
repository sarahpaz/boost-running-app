class Run < ApplicationRecord
  
  belongs_to :user
  belongs_to :charity

  validates :distance, :duration, :charity, presence: true

  def charity_attributes=(attributes)
    self.charity = Charity.find_or_create_by(attributes) if !attributes['name'].empty?
    self.charity
  end

  def self.total_distance(user)
    where("user_id = ?", user.id).inject(0) { |sum, r| sum + r.distance } 
  end

  def self.total_amount_raised(user)
    where("user_id = ?", user.id).inject(0) { |sum, r| sum + r.distance * 3 }
  end
  
end
