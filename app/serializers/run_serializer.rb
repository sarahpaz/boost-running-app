class RunSerializer < ActiveModel::Serializer
	attributes :id, :charity_id, :user_id, :distance, :duration, :location, :notes

	belongs_to :user
  belongs_to :charity
end
