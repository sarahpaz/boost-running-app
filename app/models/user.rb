class User < ApplicationRecord
  has_many :runs
  has_many :charities, through: :runs

  has_secure_password
end
