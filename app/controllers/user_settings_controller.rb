class UserSettingsController < ApplicationController
  def edit
    @user_setting = UserSetting.find_by(admin_id: current_admin.id)
    puts "I'm working!"
    puts @user_setting
  end

  def update
    @user_setting = UserSetting.find_by(admin_id: current_admin.id)
    puts params[:user_setting][:text_message]
    if @user_setting.update(text_message: params[:user_setting][:text_message])
      flash[:success] = "Settings saved!"
      redirect_to '/'
    else
      flash[:error] = "ERROR: We could not update your settings."
      redirect_to '/settings/edit'
    end
  end

end
