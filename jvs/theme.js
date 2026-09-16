// ==========================================================================
// 🌗 theme.js — إدارة موحّدة لوضع الظل والنور عبر كل صفحات الموقع
// يُستخدم في index.html و portfolio.html معاً، ليبقى اختيار الزائر متزامناً
// بينهما عبر الذاكرة الدائمة للمتصفح (LocalStorage) بلا أي وميض عند التنقل
// ==========================================================================

// 🔑 المفتاح الموحّد لحفظ واسترجاع حالة الوضع — نفس المفتاح في كل الصفحات
const THEME_STORAGE_KEY = "theme";

// --------------------------------------------------------------------------
// 1) الاسترجاع الفوري (Anti-FOUC)
//    ينفَّذ فور تحميل هذا الملف — أي قبل رسم الصفحة — ليطبّق الوضع المحفوظ
//    مباشرة على <html> ويمنع أي وميض تحول مفاجئ (Flicker) عند فتح أو
//    التنقل بين أي صفحة من صفحات الموقع.
// --------------------------------------------------------------------------
(function applyPersistedThemeImmediately() {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    } catch (e) {
        /* الوصول للـ LocalStorage غير متاح (وضع خاص مثلاً) — نستمر بالوضع الداكن الافتراضي */
    }
})();

// --------------------------------------------------------------------------
// 2) ربط زر التبديل بعد جاهزية الصفحة
//    يعمل تلقائياً مع بنية index.html (أيقونة فونت أوسم واحدة #themeIcon
//    يتم تبديل كلاسها) وبنية portfolio.html (أيقونتا SVG .icon-moon /
//    .icon-sun يتحكم بهما الـ CSS تلقائياً) في آن واحد دون أي تعارض.
// --------------------------------------------------------------------------
function initThemeToggleControl() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    if (!toggleBtn) return;

    // بعض الصفحات (index.html) تستخدم أيقونة فونت أوسم واحدة يتم تبديل كلاسها يدوياً
    const fontAwesomeIcon = document.getElementById("themeIcon");

    function syncIconState(theme) {
        // بنية index.html: تبديل يدوي لكلاس الأيقونة (fa-moon / fa-sun)
        if (fontAwesomeIcon) {
            fontAwesomeIcon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
        // بنية portfolio.html: أيقونتا SVG يتحكم بظهورهما الـ CSS تلقائياً
        // عبر :root[data-theme="light"]، فلا حاجة لأي تدخل يدوي هنا
        toggleBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    }

    function applyTheme(theme, persist) {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        syncIconState(theme);

        if (persist) {
            try {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
            } catch (e) {
                /* تجاهل إن كان التخزين المحلي غير متاح */
            }
        }
    }

    // مزامنة الأيقونة مع الحالة الحالية فور تحميل الصفحة
    // (data-theme تم تطبيقه مسبقاً في القسم الأول أعلاه قبل الرسم)
    const currentTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    syncIconState(currentTheme);

    toggleBtn.addEventListener("click", () => {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        applyTheme(isLight ? "dark" : "light", true);
    });
}

document.addEventListener("DOMContentLoaded", initThemeToggleControl);
