// ==========================================================================
// JAVASCRIPT PART 1: SMART CINEMATIC LOADER & THEATRICAL STAGE TRANSITION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.getElementById("introCounter");
    const loader = document.getElementById("intro-loader");

    if (loader) {
        // فحص ذاكرة الجلسة للمتصفح لمنع تكرار الإنترو عند العودة من البورتفوليو
        if (localStorage.getItem("introExecuted") === "true") {
            loader.style.display = "none";
            document.body.classList.add("loaded");
        } else {
            // الزيارة الأولى للموقع: تشغيل العداد والأنيميشن بالكامل
            let count = 0;
            const counterInterval = setInterval(() => {
                count += Math.floor(Math.random() * 4) + 1;
                if (count >= 100) {
                    count = 100;
                    clearInterval(counterInterval);

                    setTimeout(() => {
                        loader.classList.add("fade-out");

                        setTimeout(() => {
                            loader.classList.add("split");
                            document.body.classList.add("loaded");

                            // حفظ حالة تشغيل الإنترو في الذاكرة
                            localStorage.setItem("introExecuted", "true");

                            setTimeout(() => {
                                loader.style.display = "none";
                                loader.classList.remove("fade-out", "split");
                            }, 1400);
                        }, 400);
                    }, 400);
                }
                if (counterElement) {
                    counterElement.innerText = count.toString().padStart(2, "0");
                }
            }, 40);
        }
    }

    // 🎭 برمجة تأثير الانتقال المسرحي عند الضغط على زر معرض الأعمال
    const stageTrigger = document.getElementById("stageTrigger");

    if (stageTrigger && loader) {
        stageTrigger.addEventListener("click", function (event) {
            event.preventDefault();
            const destinationUrl = this.getAttribute("href");

            // إعادة إظهار شاشة الستائر وإغلاقها مسرحياً
            loader.style.display = "flex";
            loader.classList.add("stage-close");

            setTimeout(() => {
                window.location.href = destinationUrl;
            }, 750);
        });
    }
});

// ==========================================================================
// JAVASCRIPT PART 2: DYNAMIC JSON CERTIFICATE GALLERY & LIGHTBOX SYSTEM
// ==========================================================================

// دالة جلب الشهادات من ملف JSON المنفصل ورصها تلقائياً بالـ DOM
async function loadDynamicCertificates() {
    try {
        const response = await fetch("certificates.json");
        if (!response.ok) throw new Error("Certificates JSON file not discovered");
        const certificates = await response.json();
        const container = document.getElementById("certificatesContainer");

        if (!container) return;

        // ضخ الشهادات ديناميكياً بستايل إطار يوتيوب المتطور وأيقونة الـ Expand
        container.innerHTML = certificates
            .map(
                (cert) => `
            <div class="cert-frame cert-trigger-node" data-src="${cert.image}">
                <img src="${cert.image}" alt="${cert.title}" />
                <div class="cert-hover-overlay"><i class="fa-solid fa-expand"></i></div>
            </div>
        `
            )
            .join("");

        // تشغيل وربط محرك الـ Lightbox التكبيري فور اكتمال البناء برمجياً
        initCertificateLightbox();
    } catch (error) {
        console.error("System Error loading credentials dashboard:", error);
    }
}

// دالة تفعيل المودال والانبثاق السينمائي عند الضغط على أي شهادة
function initCertificateLightbox() {
    const certFrames = document.querySelectorAll(".cert-trigger-node");
    const certModal = document.getElementById("certLightboxModal");
    const certImgTarget = document.getElementById("lightboxTargetCert");
    const closeCertBtn = document.querySelector(".lightbox-close");

    if (certFrames.length > 0 && certModal && certImgTarget) {
        certFrames.forEach((frame) => {
            frame.addEventListener("click", function () {
                // لقط مسار الصورة المخزن ديناميكياً في الخاصية data-src
                const imageSrc = this.getAttribute("data-src");
                if (imageSrc) {
                    certImgTarget.src = imageSrc;
                    certModal.style.display = "flex";

                    setTimeout(() => {
                        certModal.classList.add("show-lightbox");
                    }, 10);
                }
            });
        });

        if (closeCertBtn) {
            closeCertBtn.addEventListener("click", closeCert);
        }

        certModal.addEventListener("click", (e) => {
            if (e.target === certModal) {
                closeCert();
            }
        });

        function closeCert() {
            certModal.classList.remove("show-lightbox");
            setTimeout(() => {
                certModal.style.display = "none";
                certImgTarget.src = ""; // تفريغ الذاكرة لسرعة الأداء
            }, 400);
        }
    }
}

// ==========================================================================
// JAVASCRIPT PART 3: EMAILJS Core CORE & INTERACTIVE FORM TRANSMISSION
// ==========================================================================

// تهيئة خدمة EmailJS الأساسية لإرسال الرسائل الحقيقية
(function () {
    emailjs.init("_8RL1bqoG0sooKzNW");
})();

// دالة إظهار النافذة المنبثقة المخصصة البديلة للـ alert التقليدي المزعج
function showCustomAlert(title, message, isSuccess) {
    const modal = document.getElementById("customAlertModal");
    const titleElement = document.getElementById("customAlertTitle");
    const messageElement = document.getElementById("customAlertMessage");

    if (!modal || !titleElement || !messageElement) return;

    titleElement.innerText = title;
    messageElement.innerText = message;

    titleElement.style.color = isSuccess ? "var(--accent-gold-bright)" : "#ff0033";

    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("reveal");
    }, 10);
}

// دالة إرسال الإيميل المتطورة مع دمج الـ Custom Alert
function sendEmail(e) {
    e.preventDefault();

    const btn = document.getElementById("sendBtn");
    const name = document.querySelector(".form-group input[type='text']").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const type = document.getElementById("user-type").value;

    if (!name || !email || !message) {
        showCustomAlert("TRANSMISSION ERROR", "Please complete all fields before attempting deployment.", false);
        return;
    }

    const templateParams = {
        from_name: name,
        user_type: type,
        user_email: email,
        message: message
    };

    btn.innerText = "TRANSMITTING...";
    btn.disabled = true;

    emailjs
        .send("service_3ikg5mx", "template_zf8k4nj", templateParams)
        .then(function () {
            showCustomAlert(
                "TRANSMISSION SUCCESSFUL",
                "Your virtual dialogue request has been securely routed directly to Ahmed Wael.",
                true
            );
            btn.innerText = "Transmit Message";
            btn.disabled = false;
            document.getElementById("emailForm").reset();
        })
        .catch(function (error) {
            showCustomAlert(
                "TRANSMISSION FAILED",
                "A protocol error occurred during network transfer. Please try later.",
                false
            );
            btn.innerText = "Transmit Message";
            btn.disabled = false;
            console.error("EmailJS Technical Bug:", error);
        });
}

// ==========================================================================
// JAVASCRIPT PART 4: SMOOTH NAVIGATION SCROLL & ACTIVE LINK OBSERVER
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 🌟 تشغيل دالة جلب الشهادات من ملف الـ JSON فور تحميل الصفحة
    loadDynamicCertificates();

    // ربط زر إغلاق النافذة المنبثقة المخصصة للفورم
    const closeAlertBtn = document.getElementById("closeAlertBtn");
    const customAlertModal = document.getElementById("customAlertModal");

    if (closeAlertBtn && customAlertModal) {
        closeAlertBtn.addEventListener("click", () => {
            customAlertModal.classList.remove("reveal");
            setTimeout(() => {
                customAlertModal.style.display = "none";
            }, 400);
        });
    }

    // برمجة الضغط على روابط الـ Navbar للتنقل السلس (Smooth Scroll)
    const navLinks = document.querySelectorAll(".navbar ul li a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // تفعيل الـ Active Link بدقة فائقة أثناء الـ Scroll باستخدام الـ Intersection Observer
    const sections = document.querySelectorAll("section, .section");

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + sectionId) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach((section) => {
        if (section.getAttribute("id")) {
            sectionObserver.observe(section);
        }
    });
});
window.onbeforeunload = function () {
    localStorage.removeItem("introExecuted");
};
window.onload = function () {
    window.scrollTo(0, 0);
};
