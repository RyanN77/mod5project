class SessionsController < ApplicationController


  def create
    parameters = eval(request.raw_post)
    @user = User.find_by(username: parameters[:username])
    if @user && @user.authenticate(parameters[:password])
      login!
      render json: {
        logged_in: true,
        user: @user
      }
    else
      render json: { 
        status: 401,
        errors: ['no such user', 'verify credentials and try again or signup']
      }
    end
  end

def is_logged_in?
    if !!session[:user_id] && current_user
      render json: {
        logged_in: true,
        user: current_user
      }
    else
      render json: {
        logged_in: false,
        message: 'no such user'
      }
    end
  end

def destroy
    logout!
    render json: {
      status: 200,
      logged_out: true
    }
  end

end

