module RunsHelper

  def user_edit_run(text, href)
    "<a href='#{href}'>#{text}</a>".html_safe
  end

  def user_delete_run(text, href, method)
    "<a data-method=\"delete\" href=\'#{href}\'>#{text}</a>".html_safe
  end
end

