// Design note:
// Project type is handled according to the project name.
// Projects names with ">" will be handled as video content
// Projects name with "_" will be handled as JSON content
// All other projects will handled as images
// The target specifies whether the href key points to a local or outside page (this is redundant as the href value should simply be checked for an 'https')

const projectsItems = [
    {
        name: "Need Music",
        description:
            "Need Music is a discovery service that promotes a variety of music curated by musicians, producers, song writers, and music journalists.",
        href: "https://www.needmusic.app",
        target: "out",
    },
    {
        name: "magenta>hotpink",
        description:
            "I have raised my cats in a simulated utopian communist household. Race and gender are meaningless.",
        href: "projects/magenta>hotpink",
        target: "in",
    },
    {
        name: "default state",
        description:
            "Silent rap with an accompanying image. For chronically depressed millenials.",
        href: "projects/defaultstate",
        target: "in",
    },
    {
        name: "Blarneybot",
        description:
            "A very rude generative-text machine built with Node and Tracery. For serious use only.",
        href: "https://t.me/BlarneyBot",
        target: "out",
    },
    {
        name: "Wabi",
        description:
            "A collection of experiments with electronic beats, atmospheric synths, overdriven arpeggios, and classical Indian vocals.",
        href: "https://davjekar.bandcamp.com",
        target: "out",
    },
    {
        name: "Doombai",
        description:
            "Images from the apocalyptic nightmare that is Mumbai. Parental guidance is advised.",
        href: "projects/doombai",
        target: "in",
    },
    {
        name: "Placid",
        description:
            "A timelapse of the clouds shot over the course of an Indian monsoon.",
        href: "https://vimeo.com/89130732",
        target: "out",
    },
    {
        name: "natural habitats",
        description: "An average day in the life.",
        href: "projects/natural_habitats",
        target: "in",
    },
];

module.exports = projectsItems;
