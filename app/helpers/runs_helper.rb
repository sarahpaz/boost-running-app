module RunsHelper

  def user_edit(run)
    if @user == current_user
      link_to("Edit", edit_run_path(run)).html_safe
    end
  end

  def user_delete(run)
    if @user == current_user
      link_to("Delete", run_path(run), method: :delete).html_safe
    end
  end
end

