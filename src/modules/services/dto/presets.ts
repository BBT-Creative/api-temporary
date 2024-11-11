export type ServiceDefaultPreset = {
	title: string;
	description: string;
	titleIndonesian?: string;
	descriptionIndonesian?: string;
	tags: string[];
	videoUrl: string;
	detail: ServiceDetailDefaultPreset;
};

type ServiceDetailDefaultPreset = {
	backgroundColor: string;
	imageUrl: string;
	flagIconPath: string;
	flagTitle: string;
	pageTitles: {
		type: "plain" | "styled";
		text: string;
	}[];
	calculation: {
		title: { type: string; text: string }[];
		titleIndonesian: { type: string; text: string }[];
		description: string;
		realTimeTitle: string;
		realTimeDescription: string;
		realTimeConsultablePrice: string;
		realTimeTermsAndConditionApply: string;
		descriptionIndonesian: string;
		realTimeTitleIndonesian: string;
		realTimeDescriptionIndonesian: string;
		realTimeConsultablePriceIndonesian: string;
		realTimeTermsAndConditionApplyIndonesian: string;
		form?: {
			fieldId: string;
			labelId: false | string;
			title: false | string;
			placeholder: false | string;
			field: "TextField" | "Autocomplete" | "Select" | "RadioGroup" | "NumberFormat" | "DateTimePicker";
			type: string;
			defaultValue: string | number | boolean | Array<any> | string[] | number[] | Record<any, any> | object | null;
			min: false | number;
			max: false | number;
			step: false | number;
			prefix: false | string;
			isCurrency: boolean;
			options: false | Array<any>;
			label: false | string;
			minRows: number;
			maxRows: false | number;
			multiline: boolean;
			displayEmpty: boolean;
			required: boolean;
			multiple: boolean;
		}[];
		formulas?: {
			name: string;
			formula: string;
			conditions: {
				fieldId: string; // The field whose value is being compared
				comparisonType: "range" | "equals" | "greaterThan" | "lessThan"; // Type of comparison
				value: number | [number, number]; // The value or range to compare against
				multiplier?: number;
			}[];
		}[];
		formResults?: {
			name: string;
			type: "currency" | "number";
			defaultValue: string;
			title: string;
			description: string;
			titleIndonesian: string;
			descriptionIndonesian: string;
			isEstimated: boolean;
		}[];
	} | null;
	contents: {
		title: string;
		titleIndonesian: string;
		description: string;
		descriptionIndonesian: string;
		serviceItems: {
			title: string[];
			description: string;
			titleIndonesian: string[];
			descriptionIndonesian: string;
			tags: string[];
			imageUrl: string;
			mobileImageUrl: string | null;
		}[];
	};
};

export const servicesPresets: ServiceDefaultPreset[] = [
	{
		title: "BBT Studio.",
		description:
			"Are you looking to elevate your event or project with top-notch online live streaming, professional offline hosting, and stunning photo and video coverage? At BBT Studio, we offer a comprehensive suite of services to meet your needs.",
		titleIndonesian: "BBT Studio.",
		descriptionIndonesian:
			"Apakah Anda ingin meningkatkan acara atau project Anda dengan layanan online live streaming terbaik, hosting offline profesional, dan liputan foto dan video yang memukau? Di BBT Studio, kami menawarkan rangkaian layanan lengkap untuk memenuhi kebutuhan Anda.",
		tags: ["Online Live Streaming", "Offline Host/MC", "Photography/Videography"],
		videoUrl: "/clouds/mov/bisa-bikin-team-creative.mp4",
		detail: {
			backgroundColor: "rgb(224, 114, 59)",
			imageUrl: "/clouds/services/bisa-bikin-team-creative.png",
			pageTitles: [
				{
					type: "plain",
					text: "Bisa Bikin",
				},
				{
					type: "styled",
					text: "Team Creative",
				},
			],
			flagIconPath: "/clouds/flagicon/bug.png",
			flagTitle: "BISA BIKIN TEAM CREATIVE",
			calculation: {
				title: [
					{ type: "styled", text: "BBT Creative Studio" },
					{ type: "plain", text: "Calculation" },
				],
				form: [
					{
						fieldId: "email_field",
						labelId: false,
						title: "Email",
						placeholder: "Input Email",
						field: "TextField",
						type: "email",
						defaultValue: "",
						min: false,
						max: false,
						step: false,
						prefix: false,
						isCurrency: false,
						options: false,
						label: false,
						minRows: 1,
						maxRows: false,
						multiline: false,
						displayEmpty: false,
						required: true,
						multiple: false,
					},
					{
						fieldId: "live_platform_field",
						labelId: false,
						title: "Live Platform",
						placeholder: "Choose Live Platfrom",
						field: "Autocomplete",
						type: "text",
						defaultValue: [],
						min: false,
						max: false,
						step: false,
						prefix: false,
						isCurrency: false,
						options: ["Tiktok", "Lazada", "Tokopedia", "Shopee"],
						label: false,
						minRows: 1,
						maxRows: false,
						multiline: false,
						displayEmpty: false,
						required: true,
						multiple: true,
					},
					{
						fieldId: "month_of_collaboration_field",
						labelId: false,
						title: "Month Of Collaboration",
						placeholder: "Select How Many Month Of Collab",
						field: "Select",
						type: "text",
						defaultValue: "",
						min: false,
						max: false,
						step: false,
						prefix: false,
						isCurrency: false,
						options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
						label: false,
						minRows: 1,
						maxRows: false,
						multiline: false,
						displayEmpty: true,
						required: true,
						multiple: false,
					},
					{
						fieldId: "total_hour_input",
						labelId: false,
						title: "Total Hours of Live Streaming/Day",
						placeholder: "Input Live Stream Hours Per day",
						field: "TextField",
						type: "number",
						defaultValue: "2",
						min: 2,
						max: 24,
						step: 1,
						prefix: false,
						isCurrency: false,
						options: false,
						label: false,
						minRows: 1,
						maxRows: false,
						multiline: false,
						displayEmpty: false,
						required: true,
						multiple: false,
					},
					{
						fieldId: "brand-name-input",
						labelId: false,
						title: "Brand Name",
						placeholder: "Input Brand Name",
						field: "TextField",
						type: "text",
						defaultValue: "",
						min: false,
						max: false,
						step: false,
						prefix: false,
						isCurrency: false,
						options: false,
						label: false,
						minRows: 1,
						maxRows: false,
						multiline: false,
						displayEmpty: false,
						required: false,
						multiple: false,
					},
					{
						fieldId: "whatsapp-number-input",
						labelId: false,
						title: "Whatsapp No.",
						placeholder: "Input Whatsapp Number",
						field: "TextField",
						type: "tel",
						defaultValue: "",
						min: false,
						max: false,
						step: false,
						prefix: "+62",
						isCurrency: false,
						options: false,
						label: false,
						minRows: 1,
						maxRows: false,
						multiline: false,
						displayEmpty: false,
						required: true,
						multiple: false,
					},
					{
						fieldId: "tiktok-brand-name-input",
						labelId: false,
						title: "Tiktok Brand Name",
						placeholder: "Input Tiktok Brand Name",
						field: "TextField",
						type: "text",
						defaultValue: "",
						min: false,
						max: false,
						step: false,
						prefix: "@",
						isCurrency: false,
						options: false,
						label: false,
						minRows: 1,
						maxRows: false,
						multiline: false,
						displayEmpty: false,
						required: true,
						multiple: false,
					},
				],
				formulas: [
					{
						name: "pricePerMonth",
						formula: "total_hour_input * live_platform_field.length * 30 * multiplier",
						conditions: [
							{
								fieldId: "month_of_collaboration_field",
								comparisonType: "range",
								value: [1, 3],
								multiplier: 200000,
							},
							{
								fieldId: "month_of_collaboration_field",
								comparisonType: "range",
								value: [4, 6],
								multiplier: 170000,
							},
							{
								fieldId: "month_of_collaboration_field",
								comparisonType: "range",
								value: [7, 12],
								multiplier: 150000,
							},
						],
					},
					{
						name: "estimatedViewers",
						formula: "total_hour_input * multiplier",
						conditions: [
							{
								fieldId: "total_hour_input",
								comparisonType: "range",
								value: [1, 4],
								multiplier: 100,
							},
							{
								fieldId: "total_hour_input",
								comparisonType: "range",
								value: [5, 8],
								multiplier: 200,
							},
							{
								fieldId: "total_hour_input",
								comparisonType: "range",
								value: [9, 12],
								multiplier: 300,
							},
							{
								fieldId: "total_hour_input",
								comparisonType: "range",
								value: [13, 16],
								multiplier: 400,
							},
							{
								fieldId: "total_hour_input",
								comparisonType: "range",
								value: [17, 20],
								multiplier: 500,
							},
							{
								fieldId: "total_hour_input",
								comparisonType: "range",
								value: [21, 24],
								multiplier: 600,
							},
						],
					},
				],
				formResults: [
					{
						name: "pricePerMonth",
						title: "Estimated Price",
						type: "currency",
						titleIndonesian: "Perkiraan Harga",
						defaultValue: "0",
						description: "Estimated Value For Price",
						descriptionIndonesian: "Perkiraan Value Untuk Harga",
						isEstimated: true,
					},
					{
						name: "estimatedViewers",
						type: "number",
						title: "Estimated Viewers",
						titleIndonesian: "Perkiraan Viewers",
						defaultValue: "0",
						description: "Estimated Value For Viewers",
						descriptionIndonesian: "Perkiraan Value Untuk Viewers",
						isEstimated: true,
					},
				],
				description:
					"Have a plan to use BBT Creative Studio services? Let's calculate your spend, and get real-time estimation price.",
				realTimeTitle: "Real-Time Estimation Price",
				realTimeDescription:
					"Use this BBT monthly calculator to estimate the budget you have for running a BBT Project. The following prices may be higher or lower depending on the duration you want for your live streaming project. note: Price is calculated is monthly price based. Viewer or Result is calculated per Live per Day based. Price and viewer or result is <strong>estimated</strong> and not fixed number.",
				realTimeConsultablePrice: "Prices are consultable",
				realTimeTermsAndConditionApply: "Terms and conditions apply",
				titleIndonesian: [
					{ type: "plain", text: "Kalkulator" },
					{ type: "styled", text: "BBT Creative Studio" },
				],
				descriptionIndonesian:
					"Punya rencana untuk menggunakan layanan BBT Creative Studio? Mari hitung pengeluaran Anda, dan dapatkan estimasi harga secara real-time.",
				realTimeTitleIndonesian: "Real-Time Estimasi Harga",
				realTimeDescriptionIndonesian:
					"Gunakan kalkulator bulanan BBT ini untuk memperkirakan anggaran yang Anda miliki untuk menjalankan Proyek BBT. Harga berikut mungkin lebih tinggi atau lebih rendah tergantung pada durasi yang Anda inginkan untuk proyek Live Stream. Catatan: Harga dihitung berdasarkan harga bulanan. Pemirsa atau Hasil dihitung per Live per Hari. Harga dan viewers atau hasil adalah <strong>perkiraan</strong> dan bukan angka tetap.",
				realTimeConsultablePriceIndonesian: "Harga dapat dikonsultasikan",
				realTimeTermsAndConditionApplyIndonesian: "Syarat dan ketentuan berlaku",
			},
			contents: {
				title: "Welcome to BBT Studio!",
				description:
					"Are you looking to elevate your event or project with top-notch online live streaming, professional offline hosting, and stunning photo and video coverage? At BBT Studio, we offer a comprehensive suite of services to meet your needs. Whether it's broadcasting your event live to a global audience, hosting an engaging offline event, or capturing high-quality photos and videos, our team is dedicated to delivering excellence every step of the way. Let us help you make a lasting impression! See what BBT Creative Studio Offer Below:",
				titleIndonesian: "Selamat Datang Di BBT Studio!",
				descriptionIndonesian:
					"Apakah Anda ingin meningkatkan acara atau project Anda dengan layanan online live streaming terbaik, hosting offline profesional, dan liputan foto dan video yang memukau? Di BBT Studio, kami menawarkan rangkaian layanan lengkap untuk memenuhi kebutuhan Anda. Baik itu menyiarkan acara Anda secara langsung ke audiens global, menyelenggarakan offline event yang menarik, atau mengambil foto dan video yang berkualitas tinggi, tim kami berdedikasi untuk memberikan keunggulan di setiap langkah. Kami akan membantu Anda! Lihat apa yang ditawarkan BBT Creative Studio di bawah ini:",
				serviceItems: [
					{
						title: ["Online", "Live Streaming"],
						description:
							"Live streaming services allows businesses to establish stronger connections with their audience,  engage their audience, build trust, increase visibility, drive sales, and measure their success in reaching marketing goals.",
						titleIndonesian: ["Online", "Live Streaming"],
						descriptionIndonesian:
							"Layanan Live Streaming memungkinkan bisnis membangun hubungan yang lebih kuat dengan audiensnya, melibatkan audiensnya, membangun kepercayaan, meningkatkan visibilitas, mendorong penjualan, dan mengukur keberhasilan mereka dalam mencapai sasaran pemasaran.",
						tags: [
							"Reporting",
							"Dedicated Host & Operator",
							"Full OBS Live Streaming",
							"Developing Content & Strategy",
						],
						imageUrl: "/clouds/serviceitems/bbt-studio/bbt-studio-serviceitems-1.png",
						mobileImageUrl: "/clouds/serviceitems/bbt-studio/bbt-studio-serviceitems-1-mobile.png",
					},
					{
						title: ["Offline", "Host/MC"],
						description:
							"We bring a touch of professionalism, charm, and charisma to your events as your dedicated Offline Master of Ceremonies. With a keen sense of timing and a knack for engaging audiences, we ensure your event runs smoothly and leaves a lasting impression on your guests.",
						titleIndonesian: ["Offline", "Host/MC"],
						descriptionIndonesian:
							"Kami menghadirkan sentuhan profesionalisme, pesona, dan karisma ke acara Anda sebagai Offline Master of Ceremonies yang berdedikasi. Dengan kepekaan terhadap waktu dan kemampuan untuk melibatkan audiens, kami memastikan acara Anda berjalan lancar dan meninggalkan kesan yang menarik pada tamu Anda.",
						tags: ["Grand Opening", "Wedding", "Product Launching"],
						imageUrl: "/clouds/serviceitems/bbt-studio/bbt-studio-serviceitems-2.png",
						mobileImageUrl: "/clouds/serviceitems/bbt-studio/bbt-studio-serviceitems-2-mobile.png",
					},
					{
						title: ["Photography &", "Videography"],
						description:
							"At BBT Studio, we are dedicated to capturing your most cherished moments with exceptional clarity and creativity. Whether you’re looking for stunning photographs, engaging videos, or a combination of both, we offer a range of services tailored to meet your needs.",
						titleIndonesian: ["Photography &", "Videography"],
						descriptionIndonesian:
							"Di BBT Studio, kami berdedikasi untuk mengabadikan momen paling berharga Anda dengan kejelasan dan kreativitas luar biasa. Baik ketika Anda mencari foto yang menakjubkan, video yang menarik, atau kombinasi dari keduanya, kami menawarkan serangkaian layanan yang disesuaikan untuk memenuhi kebutuhan Anda.",
						tags: ["Products", "Event", "Podcast", "Commercial", "Profiling"],
						imageUrl: "/clouds/serviceitems/bbt-studio/bbt-studio-serviceitems-3.png",
						mobileImageUrl: "/clouds/serviceitems/bbt-studio/bbt-studio-serviceitems-3-mobile.png",
					},
				],
			},
		},
	},
	{
		title: "BBF Mgmt.",
		description: "BBF Management excel in management solutions designed to boost your brand's visibility and impact",
		titleIndonesian: "BBF Management.",
		descriptionIndonesian:
			"BBF Management unggul dalam solusi manajemen yang dirancang untuk meningkatkan visibilitas dan dampak brand Anda.",
		tags: ["KOL Service", "Affiliate Trainee KOL", "Brand Activation", "BBT Army"],
		videoUrl: "/clouds/mov/bisa-bikin-famous-mgmt.mp4",
		detail: {
			backgroundColor: "rgb(250, 218, 51)",
			imageUrl: "/clouds/services/bisa-bikin-famous-management.png",
			pageTitles: [
				{
					type: "plain",
					text: "Bisa Bikin",
				},
				{
					type: "styled",
					text: "Famous Mgmt",
				},
			],
			flagIconPath: "/clouds/flagicon/starPerson.png",
			flagTitle: "BISA BIKIN FAMOUS MGMT",
			calculation: null,
			contents: {
				title: "Welcome to BBT Studio!",
				description:
					"Are you looking to elevate your event or project with top-notch online live streaming, professional offline hosting, and stunning photo and video coverage? At BBT Studio, we offer a comprehensive suite of services to meet your needs. Whether it's broadcasting your event live to a global audience, hosting an engaging offline event, or capturing high-quality photos and videos, our team is dedicated to delivering excellence every step of the way. Let us help you make a lasting impression! See what BBT Creative Studio Offer Below:",
				titleIndonesian: "Selamat Datang Di BBT Studio!",
				descriptionIndonesian:
					"Apakah Anda ingin meningkatkan acara atau project Anda dengan layanan online live streaming terbaik, hosting offline profesional, dan liputan foto dan video yang memukau? Di BBT Studio, kami menawarkan rangkaian layanan lengkap untuk memenuhi kebutuhan Anda. Baik itu menyiarkan acara Anda secara langsung ke audiens global, menyelenggarakan offline event yang menarik, atau mengambil foto dan video yang berkualitas tinggi, tim kami berdedikasi untuk memberikan keunggulan di setiap langkah. Kami akan membantu Anda! Lihat apa yang ditawarkan BBT Creative Studio di bawah ini:",
				serviceItems: [
					{
						title: ["KOL", "Service"],
						description:
							"We helps brands effectively leverage the power of influencers to reach new audiences, build trust, and drive conversions.",
						titleIndonesian: ["KOL", "Service"],
						descriptionIndonesian:
							"Kami membantu brand secara efektif memanfaatkan kekuatan influencer untuk menjangkau audiens baru, membangun kepercayaan, dan mendorong konversi.",
						tags: ["Meta", "Youtube", "Tiktok KOL Management for Campaign", "Influencer Outreach"],
						imageUrl: "/clouds/serviceitems/bbf/bbf-serviceitems-1.png",
						mobileImageUrl: null,
					},
					{
						title: ["Affiliate", "Trainee KOL"],
						description:
							"In today's competitive digital landscape, affiliate marketing offers a powerful way to drive sales and expand your reach. At BBT Creative, we specialize in Premium Affiliate Marketing Management, delivering tailored strategies that help you harness the full potential of affiliate partnerships to boost your revenue and grow your business.",
						titleIndonesian: ["Affiliate", "Trainee KOL"],
						descriptionIndonesian:
							"Dalam lanskap digital yang kompetitif saat ini, pemasaran afiliasi menawarkan cara yang ampuh untuk mendorong penjualan dan memperluas jangkauan Anda. Di BBT Creative, kami mengkhususkan diri dalam Manajemen Pemasaran Afiliasi Premium, yang memberikan strategi khusus yang membantu Anda memanfaatkan potensi penuh kemitraan afiliasi untuk meningkatkan pendapatan dan mengembangkan bisnis Anda.",
						tags: [
							"Affiliate Program Setup and Strategy",
							"Affiliate Relationship Management",
							"Performance Monitoring and Optimization",
							"Reporting and Analytics",
							"Affiliate Relationship Management",
						],
						imageUrl: "/clouds/serviceitems/bbf/bbf-serviceitems-2.png",
						mobileImageUrl: null,
					},
					{
						title: ["Brand", "Activation"],
						description:
							"We specialize in bringing your brand to life through dynamic and impactful brand activation strategies. Our services are designed to engage your audience, boost brand awareness, and drive meaningful interactions with your target market.",
						titleIndonesian: ["Brand", "Activation"],
						descriptionIndonesian:
							"Kami berspesialisasi dalam menghidupkan brand Anda melalui strategi brand activation yang dinamis dan berdampak. Layanan kami dirancang untuk melibatkan audiens Anda, meningkatkan brand awareness, dan mendorong interaksi yang bermakna dengan target pasar Anda.",
						tags: ["Offline Campaign Event", "Online Campaign Event"],
						imageUrl: "/clouds/serviceitems/bbf/bbf-serviceitems-3.png",
						mobileImageUrl: null,
					},
					{
						title: ["BBT", "Army"],
						description:
							"We offer BBT ARMY, designed to create buzz and amplify your brand's presence through targeted influencer and opinion leader engagement. Our services are crafted to help you leverage influential voices and generate authentic, impactful conversations around your brand.",
						titleIndonesian: ["BBT", "Army"],
						descriptionIndonesian:
							"Kami menawarkan BBT ARMY, yang dirancang untuk menciptakan perbincangan dan memperkuat kehadiran merek Anda melalui keterlibatan influencer dan pemimpin opini yang terarah. Layanan kami dirancang untuk membantu Anda memanfaatkan suara-suara berpengaruh dan menghasilkan percakapan yang autentik dan berdampak seputar brand Anda.",
						tags: [
							"Strategic Buzzer Campaign Development",
							"Engagement and Amplification",
							"Brand Reputation Management",
							"Lebih Dari 170.000 Komunitas",
						],
						imageUrl: "/clouds/serviceitems/bbf/bbf-serviceitems-4.png",
						mobileImageUrl: null,
					},
				],
			},
		},
	},
	{
		title: "BBK Creative.",
		description:
			"Welcome to BBK Creative, where creativity meets strategy. Specialize in social media handling and creative content creation, designed to elevate your brand and engage your audience.",
		titleIndonesian: "BBK Creative.",
		descriptionIndonesian:
			"BBK Creative, tempat kreativitas bertemu strategi. Kami berspesialisasi dalam social media handling dan pembuatan konten kreatif, yang dirancang untuk meningkatkan brand Anda dan melibatkan audiens Anda.",
		tags: ["Social Media Handling", "Creative Content"],
		videoUrl: "/clouds/mov/bisa-bikin-konten-creative.mp4",
		detail: {
			backgroundColor: "rgb(253, 140, 137)",
			imageUrl: "/clouds/services/bisa-bikin-konten-creative.png",
			pageTitles: [
				{
					type: "plain",
					text: "Bisa Bikin",
				},
				{
					type: "styled",
					text: "Konten Creative",
				},
			],
			flagIconPath: "/clouds/flagicon/duck.png",
			flagTitle: "BISA BIKIN KONTEN CREATIVE",
			calculation: null,
			contents: {
				title: "Welcome to BBK Creative!",
				description:
					"Welcome to BBK Creative, where creativity meets strategy. We specialize in social media handling and creative content creation, designed to elevate your brand and engage your audience. Our team crafts compelling content and manages your social media presence with a creative flair that drives results and captures attention. Let's work together to bring your vision to life and make your brand shine online! See what BBK Creative Offer Below:",
				titleIndonesian: "Selamat Datang Di BBK Creative!",
				descriptionIndonesian:
					"BBK Creative, tempat kreativitas bertemu strategi. Kami berspesialisasi dalam social media handling dan pembuatan konten kreatif, yang dirancang untuk meningkatkan brand Anda dan melibatkan audiens Anda. Tim kami membuat konten yang menarik dan mengelola 'presence' dari media sosial Anda, Tentunya dengan bakat kreatif yang mendorong hasil dan menarik perhatian. Mari bekerja sama untuk mewujudkan visi Anda dan menjadikan merek Anda bersinar secara online! Lihat Penawaran Kreatif BBK Di Bawah Ini:",
				serviceItems: [
					{
						title: ["Social", "Media Handling"],
						description:
							"Social media management is not just about maintaining profiles; it's about actively engaging with your audience, driving business growth, and nurturing long-term relationships with customers in an increasingly digital world.",
						titleIndonesian: ["Social", "Media Handling"],
						descriptionIndonesian:
							"Social Media Management bukan hanya tentang memelihara profil; tetapi tentang melibatkan secara aktif dengan audiens Anda, mendorong pertumbuhan bisnis, dan memelihara hubungan jangka panjang dengan pelanggan di dunia yang semakin digital.",
						tags: ["Meta", "X (Formerly Twitter)"],
						imageUrl: "/clouds/serviceitems/bbk/bbk-serviceitems-1.png",
						mobileImageUrl: null,
					},
					{
						title: ["Creative", "Content"],
						description:
							"BBK Creative specialize in crafting compelling and innovative content that captures attention and drives engagement. From vibrant visuals to engaging written material, our creative content services are designed to elevate your brand, communicate your message, and connect with your audience.",
						titleIndonesian: ["Creative", "Content"],
						descriptionIndonesian:
							"BBK Creative berspesialisasi dalam menciptakan konten yang menarik dan inovatif yang menarik perhatian dan mendorong keterlibatan. Dari visual yang hidup hingga materi tertulis yang menarik, layanan konten kreatif kami dirancang untuk meningkatkan brand Anda, mengomunikasikan pesan Anda, dan terhubung dengan audiens Anda.",
						tags: ["Tiktok", "Instagram Reels", "Youtube"],
						imageUrl: "/clouds/serviceitems/bbk/bbk-serviceitems-2.png",
						mobileImageUrl: null,
					},
				],
			},
		},
	},
	{
		title: "BBM Digital.",
		description: "BBM Digital specialize in maximizing your online impact with our comprehensive digital services.",
		titleIndonesian: "BBM Digital.",
		descriptionIndonesian:
			"BBM Digital berspesialisasi dalam memaksimalkan dampak online Anda dengan layanan digital komprehensif kami.",
		tags: ["Digital Ads", "SEO Optimization", "E-Commerce Ads"],
		videoUrl: "/clouds/mov/bisa-bikin-marketing-digital.mp4",
		detail: {
			backgroundColor: "rgb(71, 193, 145)",
			imageUrl: "/clouds/services/bisa-bikin-marketing-digital.png",
			pageTitles: [
				{
					type: "plain",
					text: "Bisa Bikin",
				},
				{
					type: "styled",
					text: "Marketing Digital",
				},
			],
			flagIconPath: "/clouds/flagicon/frog.png",
			flagTitle: "BISA BIKIN MARKETING DIGITAL",
			calculation: null,
			contents: {
				title: "Welocome to BBM Digital!",
				description:
					"BBM Digital specialize in maximizing your online impact with our comprehensive digital services. From crafting compelling digital ads and optimizing your SEO for better search rankings to managing targeted eCommerce campaigns, we offer solutions that drive traffic, boost visibility, and enhance your digital presence. Partner with us to elevate your online strategy and achieve measurable results! See what BBM Digital Offer Below:",
				titleIndonesian: "Selamat Datang Di BBM Digital!",
				descriptionIndonesian:
					"BBM Digital berspesialisasi dalam memaksimalkan dampak online Anda dengan layanan digital komprehensif kami. Mulai dari membuat iklan digital yang menarik dan mengoptimalkan SEO Anda untuk peringkat pencarian yang lebih baik hingga mengelola kampanye eCommerce yang ditargetkan, kami menawarkan solusi meningkatkan traffic, meningkatkan visibilitas, dan meningkatkan kehadiran digital Anda. Bermitralah dengan kami untuk meningkatkan strategi online Anda dan mencapai hasil yang terukur! Lihat Penawaran BBM Digital Di Bawah Ini:",
				serviceItems: [
					{
						title: ["Digital", "Ads"],
						description:
							"Digital advertising help you in increasing brand visibility, drive website traffic, generate leads, and ultimately achieve their marketing objectives in the competitive digital landscape.",
						titleIndonesian: ["Digital", "Ads"],
						descriptionIndonesian:
							"Digital adversting membantu Anda meningkatkan visibilitas merek, meningkatkan traffic situs web, menghasilkan prospek, dan pada akhirnya mencapai target pemasaran dalam dunia digital yang kompetitif.",
						tags: ["Meta For Business", "Google AdSense", "Tiktok Ads"],
						imageUrl: "/clouds/serviceitems/bbm/bbm-serviceitems-1.png",
						mobileImageUrl: null,
					},
					{
						title: ["SEO", "Optimization"],
						description:
							"BBM Digital are dedicated to enhancing your online presence and driving organic traffic to your website through effective SEO optimization strategies. Our goal is to help your business achieve higher search engine rankings, increase visibility, and attract qualified leads.",
						titleIndonesian: ["SEO", "Optimization"],
						descriptionIndonesian:
							"BBM Digital didedikasikan untuk meningkatkan visibilitas online Anda dan traffic organik ke situs web Anda melalui strategi pengoptimalan SEO yang efektif. Tujuan kami adalah membantu bisnis Anda mencapai peringkat mesin pencari yang lebih tinggi, meningkatkan visibilitas, dan menarik prospek yang berkualitas.",
						tags: ["On-page", "Off-page", "Technical", "Local"],
						imageUrl: "/clouds/serviceitems/bbm/bbm-serviceitems-2.png",
						mobileImageUrl: null,
					},
					{
						title: ["E-Commerce", "Ads"],
						description:
							"We specialize in creating and managing effective e-commerce advertising campaigns that drive traffic, increase sales, and maximize ROI. Our tailored approach ensures that your products reach the right audience with compelling ads that convert.",
						titleIndonesian: ["E-Commerce", "Ads"],
						descriptionIndonesian:
							"Kami berspesialisasi dalam membuat dan mengelola kampanye periklanan eCommerce efektif yang meningkatkan traffic, meningkatkan penjualan, dan memaksimalkan ROI. Pendekatan kami yang disesuaikan memastikan produk Anda menjangkau audiens yang tepat dengan iklan menarik yang menghasilkan konversi.",
						tags: ["Shopee", "Tiktok"],
						imageUrl: "/clouds/serviceitems/bbm/bbm-serviceitems-3.png",
						mobileImageUrl: null,
					},
				],
			},
		},
	},
	{
		title: "BBW Solutions.",
		description:
			"We're dedicated to bringing your digital vision to life with our expertise in web development, mobile apps, UI/UX design, and software implementation.",
		titleIndonesian: "BBW Solutions.",
		descriptionIndonesian:
			"Kami berdedikasi untuk mewujudkan visi digital Anda dengan keahlian kami dalam pengembangan web, aplikasi mobile, desain UI/UX, dan implementasi Software.",
		tags: ["Web Development", "Mobile Apps Development", "Software Impl", "UI/UX"],
		videoUrl: "/clouds/mov/bisa-bikin-web.mp4",
		detail: {
			backgroundColor: "rgb(135, 158, 237)",
			imageUrl: "/clouds/services/bisa-bikin-web.png",
			pageTitles: [
				{
					type: "plain",
					text: "Bisa Bikin",
				},
				{
					type: "styled",
					text: "Web & IT Solution",
				},
			],
			flagIconPath: "/clouds/flagicon/code.png",
			flagTitle: "BISA BIKIN WEBSITE & IT SOLUTION",
			calculation: null,
			contents: {
				title: "Welcome to BBW Solutions!",
				description:
					"Hi From BBW Solution, we're dedicated to bringing your digital vision to life with our expertise in web development, mobile apps, UI/UX design, and software implementation. Whether you need a robust website, a seamless mobile application, an intuitive user interface, or efficient software solutions, our team combines cutting-edge technology with innovative design to deliver exceptional results. Let's collaborate to transform your ideas into impactful tech solutions! See what BBW Solution Offer Below:",
				titleIndonesian: "Selamat Datang Di BBW Solutions!",
				descriptionIndonesian:
					"Halo Dari BBW Solution, kami berdedikasi untuk mewujudkan visi digital Anda dengan keahlian kami dalam pengembangan web, aplikasi mobile, desain UI/UX, dan implementasi software. Baik Anda memerlukan situs web yang tangguh, aplikasi mobile yang lancar, antarmuka pengguna yang intuitif, atau solusi software yang efisien, tim kami memadukan teknologi mutakhir dan modern dengan desain inovatif untuk memberikan hasil yang luar biasa. Mari berkolaborasi untuk mengubah ide Anda menjadi solusi teknologi yang berdampak! Lihat apa yang ditawarkan BBW Solution di bawah ini:",
				serviceItems: [
					{
						title: ["Web", "Development"],
						description:
							"BBW Solution are dedicated to building exceptional websites that not only look great but also function seamlessly. Whether you need a brand-new website, a redesign, or ongoing maintenance, our web development services are tailored to meet your specific needs and help your business thrive online.",
						titleIndonesian: ["Web", "Development"],
						descriptionIndonesian:
							"BBW Solution didedikasikan untuk membangun situs web luar biasa yang tidak hanya tampak hebat tetapi juga berfungsi dengan lancar. Baik Anda memerlukan situs web baru, desain ulang, atau maintenance berkelanjutan, layanan pengembangan web kami disesuaikan untuk memenuhi kebutuhan spesifik Anda dan membantu bisnis Anda berkembang secara online.",
						tags: ["Wordpress", "Native", "Hybrid"],
						imageUrl: "/clouds/serviceitems/bbw/bbw-serviceitems-1.png",
						mobileImageUrl: null,
					},
					{
						title: ["Mobile", "Apps"],
						description:
							"We specialize in creating innovative, user-friendly mobile applications that drive engagement and deliver results. Whether you need a native app, a cross-platform solution, or ongoing maintenance, our mobile app development services are designed to meet your needs and exceed your expectations.",
						titleIndonesian: ["Mobile", "Apps"],
						descriptionIndonesian:
							"Kami berspesialisasi dalam menciptakan aplikasi mobile yang inovatif dan user-friendly yang mendorong keterlibatan dan memberikan hasil. Baik Anda memerlukan aplikasi native, cross-platform, atau maintenance berkelanjutan, layanan pengembangan aplikasi mobile kami dirancang untuk memenuhi kebutuhan Anda.",
						tags: ["Android", "iOS"],
						imageUrl: "/clouds/serviceitems/bbw/bbw-serviceitems-2.png",
						mobileImageUrl: null,
					},
					{
						title: ["UI/", "UX"],
						description:
							"Our UI/UX design services are focused on crafting designs that engage users, enhance usability, and drive your business success.",
						titleIndonesian: ["UI/", "UX"],
						descriptionIndonesian:
							"Layanan desain UI/UX kami difokuskan pada pembuatan desain yang melibatkan pengguna, meningkatkan kegunaan, dan mendorong kesuksesan bisnis Anda.",
						tags: ["UI", "UX", "Prototype"],
						imageUrl: "/clouds/serviceitems/bbw/bbw-serviceitems-3.png",
						mobileImageUrl: null,
					},
					{
						title: ["Software", "Implementation"],
						description:
							"We provide comprehensive software implementation services designed to help businesses seamlessly integrate and maximize their software solutions. Our goal is to ensure that your software is effectively deployed, configured, and optimized to meet your specific needs and deliver measurable results.",
						titleIndonesian: ["Software", "Implementation"],
						descriptionIndonesian:
							"Kami menyediakan layanan implementasi software komprehensif yang dirancang untuk membantu bisnis mengintegrasikan dan memaksimalkan software mereka dengan lancar. Tujuan kami adalah memastikan bahwa software Anda diterapkan, dikonfigurasi, dan dioptimalkan secara efektif untuk memenuhi kebutuhan spesifik Anda dan memberikan hasil yang terukur.",
						tags: ["Whatsapp for Business", "Adobe Creative Cloud"],
						imageUrl: "/clouds/serviceitems/bbw/bbw-serviceitems-4.png",
						mobileImageUrl: null,
					},
				],
			},
		},
	},
];
