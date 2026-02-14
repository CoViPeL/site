module.exports = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    async redirects() {
        return [{
            source: "/examples",
            destination: "https://github.com/CoViPeL/covipel#experiments",
            permanent: true,
        }, ];
    },
};