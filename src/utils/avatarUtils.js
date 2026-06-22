export const getSafeAvatarUrl = (avatarUrl, name, email) => {
  if (!avatarUrl || avatarUrl === 'null' || avatarUrl === 'undefined' || avatarUrl.includes('localhost')) {
    const nameStr = encodeURIComponent(name || email || 'User');
    return `https://ui-avatars.com/api/?name=${nameStr}&background=random&color=fff&size=200`;
  }
  return avatarUrl;
};
