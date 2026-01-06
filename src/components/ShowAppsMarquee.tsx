import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const APPS = [
    {
        src: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
        alt: 'slack icon',
        IconName: 'Slack',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/teams.microsoft.com',
        alt: 'microsoft icon',
        IconName: 'Microsoft',
    },
    {
        src: 'https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg',
        alt: 'zoom icon',
        IconName: 'Zoom',
    },
    {
        src: 'https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png',
        alt: 'gmail icon',
        IconName: 'Gmail',
    },
    // {
    //     src: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png',
    //     alt: 'google sheet icon',
    // },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Google_Sheets_2020_Logo.svg/1489px-Google_Sheets_2020_Logo.svg.png',
        alt: 'google sheet icon',
        IconName: 'Google Sheets',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/hubspot.com',
        alt: 'hubspot icon',
        IconName: 'Hubspot',
    },
    {
        src: 'https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png',
        alt: 'salesforce icon',
        IconName: 'Salesforce',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/pipedrive.com',
        alt: 'pipedrive icon',
        IconName: 'Pipedrive',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/quickbooks.com',
        alt: 'quickbooks icon',
        IconName: 'Quickbooks',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/xero.com',
        alt: 'xero icon',
        IconName: 'Xero',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/mailchimp.com',
        alt: 'mailchimp icon',
        IconName: 'Mailchimp',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/activecampaign.com',
        alt: 'activecampaign icon',
        IconName: 'ActiveCampaign',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/zendesk.com',
        alt: 'zendesk icon',
        IconName: 'Zendesk',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/freshdesk.com',
        alt: 'freshdesk icon',
        IconName: 'Freshdesk',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/trello.com',
        alt: 'trello icon',
        IconName: 'Trello',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/asana.com',
        alt: 'asana icon',
        IconName: 'Asana',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/clickup.com',
        alt: 'clickup icon',
        IconName: 'Clickup',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/notion.com',
        alt: 'notion icon',
        IconName: 'Notion',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/fireflies.ai',
        alt: 'fireflies icon',
        IconName: 'Fireflies',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/msg91.com',
        alt: 'msg91 icon',
        IconName: 'Msg91',
    }
];

const ShowAppsMarquee = () => {
    return (
        <div className="container">
            <div className="border border-t-0 border-b-0 border-dark flex flex-col gap-8 py-28 px-6">
                <div className="flex gap-4 md:flex-row flex-col items-center">
                    <div className="uppercase text-sm whitespace-nowrap">
                        <p className="text-center text-gray-dark">Loved by Teams Using These Apps</p>
                    </div>
                    <Marquee
                        direction="left"
                        speed={40}
                        autoFill
                    >
                        <div className="inline-flex py-4 gap-20">
                            {APPS.slice(0, 9).map((app, index) => (
                                <div className={`flex items-center gap-2 ${index === 0 ? 'ml-20' : ''}`} key={`${app.IconName}-${index}`}>
                                    <Image
                                        src={app.src}
                                        alt={app.alt}
                                        width={30}
                                        height={30}
                                        loading="lazy"
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                        className={`object-contain cursor-pointer`}
                                    />
                                    <p className="text-center font-medium text-lg text-gray-light">{app.IconName}</p>
                                </div>
                            ))}
                        </div>
                    </Marquee>
                </div>
                <Marquee
                    direction="right"
                    speed={40}
                    autoFill
                >
                    <div className="inline-flex py-4 gap-20">
                        {APPS.slice(9, 20).map((app, index) => (
                            <div className={`flex items-center gap-2 ${index === 0 ? 'ml-20' : ''}`} key={`${app.IconName}-${index}`}>
                                <Image
                                    src={app.src}
                                    alt={app.alt}
                                    width={30}
                                    height={30}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                    className={`object-contain cursor-pointer`}
                                />
                                <p className="text-center font-medium text-lg text-gray-light">{app.IconName}</p>
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default ShowAppsMarquee;
