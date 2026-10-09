export default defineNuxtRouteMiddleware(async (to) => {
  // Akses admin tetap dilindungi validasi PIN dari server.
  if (to.path.startsWith("/admin")) {
    try {
      const access = await $fetch<{ authorized: boolean }>(
        "/api/admin-access/status",
      );

      if (!access.authorized) return navigateTo("/");
    } catch {
      return navigateTo("/");
    }
  }
});
