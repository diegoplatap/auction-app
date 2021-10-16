const iconsName = routeName => {
  const icons = {
    Explore: "explore",
    Add: "add-circle",
    Bookmarks: "bookmark",
    Settings: "settings",
  };

  return icons[routeName] || "users";
};

export default iconsName;
