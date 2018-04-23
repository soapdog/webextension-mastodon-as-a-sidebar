browser.menus.create({
  id: "reload-pinafore",
  title: "Reload Pinafore",
  documentUrlPatterns: ["https://pinafore.social/*"]
});

function reloadSidebar() {
  browser.sidebarAction.setPanel({ panel: "https://pinafore.social" });
}

browser.menus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "reload-pinafore") {
    browser.sidebarAction.getPanel({}).then(reloadSidebar)
  }
});

browser.commands.onCommand.addListener(function (command) {
  if (command == "toggle-sidebar") {
    browser.sidebarAction.isOpen({}).then(isOpen => {
      if (isOpen) {
        browser.sidebarAction.close()
      } else {
        browser.sidebarAction.open();
      }
    });

  }
});