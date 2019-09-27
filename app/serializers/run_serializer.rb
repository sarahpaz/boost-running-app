class RunSerializer < ActiveModel::Serializer
	attributes :id, :charity_id, :user_id, :distance, :duration, :location, :notes, :username

	belongs_to :user
	belongs_to :charity
	
	def username
		un = object.user
		un.username
	end
end

