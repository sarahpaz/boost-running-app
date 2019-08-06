class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?, :total_raised, :charity_total_raised
  add_flash_types :danger

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def total_raised
    @user.runs.inject(0) { |sum, r| sum + r.distance * 3 }
  end

  def charity_total_raised
    @charity.runs.inject(0) { |sum, r| sum + r.distance * 3 }
  end
  
end
