import { CaseStudyResultType } from "@prisma/client";

type CaseStudyDetail = {
	titleIndonesian?: string;
	description: string;
	descriptionIndonesian: string;
	clientName: string;
	clientIndustry: string;
	clientLogoUrl: string;
	yearCollabs: string;
	serviceName: string[];
	serviceTags: string[];
	result: {
		type: CaseStudyResultType;
		resultName: string;
		value: number;
	}[];
};

type CaseStudy = {
	title: string;
	posterPath: string;
	posterCaption?: string;
	content: string;
	category: {
		id: number;
	}[];
	caseStudy: CaseStudyDetail;
};

export const caseStudyPreset: CaseStudy[] = [
	{
		title: "We Increase brand awareness through interesting and interactive Shopee live streaming and various TikTok video content. We managed to increase their brand visibility and brand awareness with shopee live streaming.",
		posterPath: "/clouds/insight-poster/mamypoko.png",
		content: `
            <p class="insight-article-p-gallery-container insight-article-gallery-1_2">
                <div class="insight-article-gallery-wrapper">
                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-1-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-2-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-1">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mamypoko-big.png" />
                        </span>
                    </div>
                </div>
            </p>

            <h3 class="insight-article-heading-3-class">
                The Objective
            </h3>

            <p class="insight-article-p-block">
                Untuk meningkatkan brand awareness Mamypoko serta memperkuat kehadiran mereknya di pasar melalui pemanfaatan live streaming interaktif Shopee dan konten TikTok yang beragam. Tujuannya adalah untuk terhubung dengan orang tua dengan menyoroti nilai inti merek seperti kenyamanan, keandalan, dan inovasi dalam perawatan bayi.
            </p>

            <p class="insight-article-p-block">
                Selain meningkatkan keterlibatan, objektif lainnya adalah menciptakan pengalaman merek yang berkesan, yang pada akhirnya meningkatkan loyalitas merek dan preferensi produk di antara para orang tua dan pengasuh.
            </p>

            <h3 class="insight-article-heading-3-class">
                Our Approach
            </h3>

            <p class="insight-article-p-block">
                Melalui live streaming Shopee yang menarik dan berkualitas tinggi, kami menyelenggarakan sesi interaktif yang menampilkan fitur-fitur produk secara langsung, menjawab pertanyaan konsumen, dan menawarkan promo eksklusif. Sesi ini membantu memposisikan Mamypoko sebagai merek unggulan untuk perawatan bayi, serta mempererat hubungan emosional dengan audiens.
            </p>

            <p class="insight-article-p-block">
                Secara bersamaan, kami juga mengelola akun TikTok Mamypoko dengan memproduksi konten yang bervariasi dan kreatif, termasuk demo produk, konten buatan pengguna (UGC), tantangan berbasis tren, dan video trivia. Pendekatan multi-platform ini memperluas visibilitas brand dan memungkinkan Mamypoko terlibat dengan audiensnya dengan cara yang baru dan bermakna.
            </p>
        `,
		category: [{ id: 102 }],
		caseStudy: {
			titleIndonesian:
				"Kami meningkatkan brand awareness melalui live streaming Shopee yang menarik dan interaktif serta beragam konten video TikTok. Kami berhasil meningkatkan visibilitas brand dan brand awareness mereka dengan live streaming shopee.",
			description: `
                <p class="insight-article-p-block">MamyPoko is a leading baby diaper brand, renowned for its superior absorbency and soft materials, ensuring comfort and dryness for babies. Utilizing advanced Japanese technology, MamyPoko continuously innovates to create products that meet the needs of both parents and babies.</p>
                <p class="insight-article-p-block">We helped MamyPoko increase its brand awareness by hosting engaging and interactive live streaming events on Shopee, complemented by creative TikTok video content. These efforts successfully boosted the brand's visibility and awareness, allowing MamyPoko to reach a broader audience.</p>
            `,
			descriptionIndonesian: `
                <p class="insight-article-p-block">MamyPoko adalah merek popok bayi terkemuka yang dikenal dengan daya serap yang unggul dan bahan yang lembut, memastikan kenyamanan dan kekeringan bagi bayi. Dengan menggunakan teknologi canggih Jepang, MamyPoko terus berinovasi untuk menciptakan produk yang memenuhi kebutuhan orang tua dan bayi.</p>
                <p class="insight-article-p-block">Kami membantu MamyPoko meningkatkan brand awareness mereka dengan hosting live streaming yang menarik dan interaktif di Shopee, serta melengkapi dengan konten video kreatif di TikTok. Upaya ini berhasil meningkatkan visibilitas dan kesadaran merek, memungkinkan MamyPoko menjangkau audiens yang lebih luas.</p>
            `,
			clientName: "Mamypoko",
			clientIndustry: "Pant-Style Diapers",
			clientLogoUrl: "/clouds/clients/mamypoko.png",
			yearCollabs: "2024",
			serviceName: ["BBT Studio"],
			serviceTags: ["Online Live Streaming"],
			result: [
				{ resultName: "Viewers Click During Live Stream", type: "number", value: 29400 },
				{ resultName: "Product Sold Within 8 Hours Of Live Streaming", type: "number", value: 5500 },
			],
		},
	},
	{
		title: "We enhanced MOC's brand visibility on TikTok through engaging live streaming sessions. Our professional hosts created an interactive experience that captivated the audience. This strategy successfully boosted engagement and strengthened their connection with viewers.",
		posterPath: "/clouds/insight-poster/moc.png",
		content: `
            <p class="insight-article-p-gallery-container insight-article-gallery-1_2">
                <div class="insight-article-gallery-wrapper">
                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-1-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-2-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-1">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/moc-big.png" />
                        </span>
                    </div>
                </div>
            </p>

            <h3 class="insight-article-heading-3-class">
                The Objective
            </h3>

            <p class="insight-article-p-block">
                Untuk meningkatkan visibilitas brand MOC dan memperkuat koneksi dengan audiens muda melalui sesi live streaming interaktif di TikTok. Tujuan lainnya adalah memperluas kesadaran merek di pasar fashion nasional, serta mengkomunikasikan nilai-nilai merek yang berfokus pada tren dan gaya hidup modern.
            </p>

            <p class="insight-article-p-block">
                Kami juga berupaya meningkatkan keterlibatan pengguna dengan menghadirkan pengalaman belanja yang lebih personal dan menyenangkan, yang mendorong loyalitas terhadap brand.
            </p>

            <h3 class="insight-article-heading-3-class">
                Our Approach
            </h3>

            <p class="insight-article-p-block">
                Melalui sesi live streaming di TikTok, kami mengelola acara yang dipandu oleh host profesional, menciptakan pengalaman interaktif yang memikat penonton. Dengan menampilkan produk terbaru dan menawarkan promosi eksklusif, kami berhasil membangun hubungan yang lebih kuat dengan audiens.
            </p>

            <p class="insight-article-p-block">
                Kami juga menyesuaikan konten untuk tetap relevan dengan tren mode terbaru dan gaya hidup, yang mencerminkan identitas MOC sebagai merek fashion modern. Pendekatan ini membantu MOC tetap terhubung dengan pelanggannya dan menarik pelanggan baru di seluruh Indonesia.
            </p>
        `,
		category: [{ id: 102 }],
		caseStudy: {
			titleIndonesian:
				"Kami meningkatkan visibilitas brand MOC di TikTok melalui sesi live streaming yang menarik. Pembawa acara profesional kami menciptakan pengalaman interaktif yang memikat audiens. Strategi ini berhasil meningkatkan keterlibatan dan memperkuat hubungan dengan pemirsa.",
			description: `
                <p class="insight-article-p-block">MOC is a prominent local fashion brand under PT MEGA PERINTIS Tbk, established in 2000. Over the past two decades, MOC has grown into a national brand recognized for its innovative fashion collections that blend modern style with individuality. The brand is committed to offering diverse products that resonate with the dynamic lifestyle of its customers, from casual wear to more formal outfits.</p>
                <p class="insight-article-p-block">To help MOC enhance its brand visibility, we focused on leveraging TikTok live streaming. Our professional hosts created engaging, interactive sessions that captivated the audience, increasing viewer engagement and strengthening MOC's connection with a wider audience. This strategy proved successful in boosting brand visibility and expanding their reach on digital platforms.</p>
            `,
			descriptionIndonesian: `
                <p class="insight-article-p-block">MOC adalah merek fashion lokal terkemuka di bawah PT MEGA PERINTIS Tbk yang didirikan pada tahun 2000. Selama dua dekade terakhir, MOC telah berkembang menjadi merek nasional yang dikenal dengan koleksi fashion inovatif yang menggabungkan gaya modern dan kepribadian unik. MOC berkomitmen untuk menawarkan berbagai produk yang mencerminkan gaya hidup dinamis pelanggannya, dari pakaian kasual hingga busana formal.</p>
                <p class="insight-article-p-block">Kami membantu MOC meningkatkan visibilitas brand mereka melalui live streaming di TikTok. Pembawa acara profesional kami menciptakan sesi interaktif yang menarik, memikat audiens dan meningkatkan keterlibatan penonton, serta memperkuat hubungan MOC dengan audiens yang lebih luas. Strategi ini berhasil meningkatkan visibilitas brand mereka di platform digital.</p>
            `,
			clientName: "MOC",
			clientIndustry: "Fashion",
			clientLogoUrl: "/clouds/clients/moc.png",
			yearCollabs: "2023",
			serviceName: ["BBT Studio", "BBF Mgmt."],
			serviceTags: ["Online Live Streaming", "Brand Activation"],
			result: [
				{ resultName: "Viewers Click During Live Stream", type: "number", value: 22700 },
				{ resultName: "Organic Traffic", type: "percentage", value: 94.8 },
			],
		},
	},
	{
		title: "Through the TikTok platform, we focus on increasing their brand visibility through TikTok live streaming supported by our professional hosts, we create an interactive experience that is acceptable to the audience.",
		posterPath: "/clouds/insight-poster/cbd.png",
		content: `
            <p class="insight-article-p-gallery-container insight-article-gallery-1_2">
                <div class="insight-article-gallery-wrapper">
                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-1-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-2-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-1">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/cbd-big.png" />
                        </span>
                    </div>
                </div>
            </p>

            <h3 class="insight-article-heading-3-class">
                The Objective
            </h3>

            <p class="insight-article-p-block">
                Untuk meningkatkan visibilitas dan kepercayaan brand CBD Professional di pasar perawatan rambut lokal melalui penggunaan live streaming TikTok dan konten video kreatif. Kami juga bertujuan untuk menampilkan kualitas unggul dari produk perawatan rambut mereka, serta mengedukasi konsumen tentang manfaat produk.
            </p>

            <p class="insight-article-p-block">
                Selain itu, kami ingin menciptakan kehadiran online yang lebih kuat yang memposisikan CBD Professional sebagai merek perawatan rambut yang dapat diandalkan oleh konsumen.
            </p>

            <h3 class="insight-article-heading-3-class">
                Our Approach
            </h3>

            <p class="insight-article-p-block">
                Melalui platform TikTok, kami memfokuskan upaya pada live streaming yang didukung oleh host profesional yang memberikan demonstrasi produk secara interaktif dan menjawab pertanyaan dari audiens. Sesi ini memperkuat kesadaran konsumen akan manfaat produk, sekaligus meningkatkan keterlibatan mereka dengan brand.
            </p>

            <p class="insight-article-p-block">
                Kami juga mengembangkan berbagai konten video TikTok, termasuk tutorial perawatan rambut, ulasan produk oleh konsumen, dan tren rambut terkini. Pendekatan ini memastikan bahwa CBD Professional tidak hanya dikenal, tetapi juga dipercaya sebagai pemimpin dalam produk perawatan rambut berkualitas tinggi.
            </p>
        `,
		category: [{ id: 102 }],
		caseStudy: {
			titleIndonesian:
				"Melalui platform TikTok, kami fokus untuk meningkatkan visibilitas brand mereka melalui live streaming TikTok yang didukung oleh host profesional kami, kami menciptakan pengalaman interaktif yang dapat diterima oleh penonton.",
			description: `
                <p class="insight-article-p-block">CBD Professional is a local brand dedicated to delivering high-quality hair care products infused with Keratin, Pro-Vit B5, and Pomegranate extracts. Their product range is designed to nourish, strengthen, and revitalize all hair types, bringing salon-quality results directly to consumers at home.</p>
                <p class="insight-article-p-block">We focused on increasing CBD Professional's brand visibility through engaging live streaming sessions on TikTok. Supported by our professional hosts, these interactive sessions created a connection with the audience, making the brand more visible and accessible in the local hair care market.</p>
            `,
			descriptionIndonesian: `
                <p class="insight-article-p-block">CBD Professional adalah merek lokal yang berkomitmen untuk menyediakan produk perawatan rambut berkualitas tinggi yang diperkaya dengan Keratin, Pro-Vit B5, dan ekstrak Delima. Rangkaian produk mereka dirancang untuk menutrisi, memperkuat, dan meremajakan semua jenis rambut, memberikan hasil berkualitas salon langsung ke rumah.</p>
                <p class="insight-article-p-block">Kami fokus meningkatkan visibilitas brand CBD Professional melalui sesi live streaming interaktif di TikTok. Didukung oleh host profesional kami, sesi interaktif ini menciptakan koneksi dengan audiens, membuat merek ini lebih terlihat dan dapat diakses di pasar perawatan rambut lokal.</p>
            `,
			clientName: "CBD Professional",
			clientIndustry: "Haircare",
			clientLogoUrl: "/clouds/clients/cbd.png",
			yearCollabs: "2023",
			serviceName: ["BBT Studio"],
			serviceTags: ["Online Live Streaming"],

			result: [
				{ resultName: "Viewers Click During Live Stream", type: "number", value: 29400 },
				{ resultName: "Organic Traffic", type: "percentage", value: 50.4 },
			],
		},
	},
	{
		title: "By leveraging TikTok live streaming, we helped Herborist boost their brand awareness. Our expert hosts delivered interactive sessions that resonated with the audience, driving increased engagement and visibility.",
		posterPath: "/clouds/insight-poster/herborist.png",
		content: `
            <p class="insight-article-p-gallery-container insight-article-gallery-1_2">
                <div class="insight-article-gallery-wrapper">
                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-1-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-2-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-1">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/herborist-big.png" />
                        </span>
                    </div>
                </div>
            </p>

            <h3 class="insight-article-heading-3-class">
                The Objective
            </h3>

            <p class="insight-article-p-block">
                Untuk meningkatkan brand awareness Herborist di pasar perawatan kulit lokal dengan memanfaatkan live streaming interaktif di TikTok. Kami juga berfokus untuk meningkatkan engagement dan membangun kepercayaan konsumen terhadap kualitas produk perawatan kulit alami mereka.
            </p>

            <p class="insight-article-p-block">
                Selain itu, kami berupaya menciptakan kampanye digital yang mendorong lebih banyak interaksi organik dari audiens, yang memperkuat posisi Herborist sebagai merek terpercaya dalam perawatan kulit.
            </p>

            <h3 class="insight-article-heading-3-class">
                Our Approach
            </h3>

            <p class="insight-article-p-block">
                Melalui sesi live streaming di TikTok yang dipandu oleh host profesional, kami menyajikan presentasi interaktif tentang keunggulan produk Herborist, termasuk cara penggunaannya dan manfaat dari bahan-bahan alami yang digunakan. Sesi ini berhasil meningkatkan keterlibatan dan menciptakan kepercayaan yang lebih kuat di kalangan konsumen.
            </p>

            <p class="insight-article-p-block">
                Kami juga memproduksi konten video TikTok yang beragam, termasuk tutorial perawatan kulit, testimoni pelanggan, dan partisipasi dalam tren kecantikan. Pendekatan ini membantu memperluas jangkauan Herborist, serta mendorong lebih banyak konsumen untuk mencoba produk mereka.
            </p>
        `,
		category: [{ id: 102 }],
		caseStudy: {
			titleIndonesian:
				"Dengan memanfaatkan live streaming TikTok, kami membantu Herborist meningkatkan brand awareness mereka. Host profesional kami menyampaikan sesi interaktif yang beresonansi dengan audiens, meningkatkan keterlibatan dan visibilitas.",
			description: `
                <p class="insight-article-p-block">Herborist is a leading brand in personal care, offering a variety of products that blend traditional herbal ingredients with modern technology. Known for its commitment to natural beauty, Herborist products provide nourishment and care for both the body and the skin.</p>
                <p class="insight-article-p-block">By leveraging TikTok live streaming, we helped Herborist boost its brand awareness. Our expert hosts led interactive sessions that resonated with the audience, driving higher engagement and increasing the brand's visibility in the competitive personal care market.</p>
            `,
			descriptionIndonesian: `
                <p class="insight-article-p-block">Herborist adalah merek perawatan pribadi terkemuka yang menawarkan berbagai produk yang menggabungkan bahan herbal tradisional dengan teknologi modern. Dikenal dengan komitmennya terhadap kecantikan alami, produk Herborist memberikan nutrisi dan perawatan untuk tubuh dan kulit.</p>
                <p class="insight-article-p-block">Dengan memanfaatkan live streaming di TikTok, kami membantu Herborist meningkatkan brand awareness mereka. Host profesional kami memimpin sesi interaktif yang beresonansi dengan audiens, mendorong keterlibatan yang lebih tinggi dan meningkatkan visibilitas merek di pasar perawatan pribadi yang kompetitif.</p>
            `,
			clientName: "Herborist",
			clientIndustry: "Beauty",
			clientLogoUrl: "/clouds/clients/herborist.png",
			yearCollabs: "2023",
			serviceName: ["BBT Studio"],
			serviceTags: ["Online Live Streaming"],
			result: [
				{ resultName: "Viewers Click During Live Stream", type: "number", value: 33700 },
				{ resultName: "Organic Traffic", type: "percentage", value: 80.5 },
			],
		},
	},
	{
		title: "We enhanced Manzone brand visibility by hosting captivating live streaming events on TikTok. Our professional hosts successfully engaged the audience, creating an interactive and enjoyable shopping experience.",
		posterPath: "/clouds/insight-poster/manzone.png",
		content: `
            <p class="insight-article-p-gallery-container insight-article-gallery-1_2">
                <div class="insight-article-gallery-wrapper">
                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-1-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-2-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-1">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/manzone-big.png" />
                        </span>
                    </div>
                </div>
            </p>

            <h3 class="insight-article-heading-3-class">
                The Objective
            </h3>

            <p class="insight-article-p-block">
                Untuk meningkatkan kesadaran brand Manzone melalui strategi live streaming yang interaktif dan menyenangkan di TikTok. Kami bertujuan untuk memperkenalkan produk pakaian pria berkualitas mereka kepada audiens yang lebih luas, serta mendorong penjualan melalui kampanye promosi yang menarik.
            </p>

            <p class="insight-article-p-block">
                Selain itu, kami ingin memperkuat hubungan Manzone dengan konsumennya dengan menghadirkan pengalaman belanja yang mudah dan menyenangkan.
            </p>

            <h3 class="insight-article-heading-3-class">
                Our Approach
            </h3>

            <p class="insight-article-p-block">
                Dengan Live streaming di TikTok, kami memastikan pengalaman belanja yang menarik dengan panduan host profesional yang menampilkan produk terbaru dan promo eksklusif. Sesi ini berhasil meningkatkan keterlibatan konsumen serta memperkuat visibilitas brand di pasar fashion pria.
            </p>

            <p class="insight-article-p-block">
                Konten kreatif seperti ulasan produk, tips gaya berpakaian, dan tren fashion terbaru juga diintegrasikan ke dalam akun TikTok Manzone. Pendekatan ini tidak hanya menarik perhatian audiens baru, tetapi juga memastikan Manzone tetap relevan di kalangan konsumen setianya.
            </p>
        `,
		category: [{ id: 102 }],
		caseStudy: {
			titleIndonesian:
				"Kami meningkatkan visibilitas brand Manzone dengan mengadakan acara live streaming yang menarik di TikTok. Pembawa acara profesional kami berhasil melibatkan audiens, menciptakan pengalaman belanja yang interaktif dan menyenangkan.",
			description: `
                <p class="insight-article-p-block">Manzone is a well-established menswear brand, offering a wide range of clothing options from casual to formal. Known for its contemporary designs and quality fabrics, Manzone caters to the modern man, ensuring that every piece exudes style and confidence.</p>
                <p class="insight-article-p-block">Now, with more than 100 stores across Indonesia, Manzone has established itself as a trusted name in men's fashion. Each store is replenished with new merchandise weekly, keeping the collections fresh and up to date with the latest styles. Whether for casual or formal occasions, Manzone offers a wide range of fashion-forward options that cater to modern men looking to stay on trend without breaking the bank.</p>
            `,
			descriptionIndonesian: `
                <p class="insight-article-p-block">Manzone adalah merek pakaian pria yang mapan, menawarkan berbagai pilihan pakaian dari kasual hingga formal. Dikenal dengan desain kontemporer dan kain berkualitas, Manzone melayani pria modern, memastikan setiap produk memancarkan gaya dan kepercayaan diri.</p>
                <p class="insight-article-p-block">Kami membantu Manzone meningkatkan visibilitas mereknya melalui sesi live streaming yang menarik di TikTok. Pembawa acara profesional kami menyajikan konten yang memikat dan beresonansi dengan penonton, menciptakan pengalaman belanja interaktif yang meningkatkan keterlibatan dan visibilitas merek.</p>
            `,
			clientName: "Manzone",
			clientIndustry: "Man Fashion",
			clientLogoUrl: "/clouds/clients/manzone.png",
			yearCollabs: "2024",
			serviceName: ["BBT Studio"],
			serviceTags: ["Online Live Streaming"],
			result: [
				{ resultName: "Viewers Click During Live Stream", type: "number", value: 25900 },
				{ resultName: "Organic Traffic", type: "percentage", value: 89.1 },
			],
		},
	},
	{
		title: "Nu Face brand visibility grew significantly through engaging live streaming on TikTok. Our professional hosts provided an interactive and engaging experience, helping them connect with a broader audience, make result higher.",
		posterPath: "/clouds/insight-poster/nuface.png",
		content: `
            <p class="insight-article-p-gallery-container insight-article-gallery-1_2">
                <div class="insight-article-gallery-wrapper">
                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-1-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-2">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/mocked-2-small.png" />
                        </span>
                    </div>

                    <div class="insight-article-gallery-item-span-1">
                        <span class="insight-article-gallery-Img-img">
                            <img src="/clouds/case-study/nuface-big.png" />
                        </span>
                    </div>
                </div>
            </p>

            <h3 class="insight-article-heading-3-class">
                The Objective
            </h3>

            <p class="insight-article-p-block">
                Untuk meningkatkan visibilitas brand Nu Face dan memperluas jangkauan audiens melalui live streaming TikTok yang menarik dan interaktif. Kami juga bertujuan untuk memperkuat citra merek sebagai brand perawatan kulit yang dapat diandalkan dengan produk-produk berkualitas tinggi.
            </p>

            <p class="insight-article-p-block">
                Selain itu, kami berupaya membangun koneksi emosional yang lebih dalam dengan konsumen, meningkatkan loyalitas, dan meningkatkan preferensi terhadap produk Nu Face.
            </p>

            <h3 class="insight-article-heading-3-class">
                Our Approach
            </h3>

            <p class="insight-article-p-block">
                Dengan memanfaatkan live streaming di TikTok, kami menghadirkan sesi yang dipandu oleh host profesional untuk menunjukkan manfaat dan penggunaan produk perawatan kulit Nu Face. Interaksi langsung dengan audiens memungkinkan kami membangun hubungan yang lebih personal dengan konsumen dan meningkatkan minat terhadap brand.
            </p>

            <p class="insight-article-p-block">
                Kami juga mengoptimalkan konten video TikTok dengan menampilkan hasil nyata dari penggunaan produk, ulasan dari pengguna, dan panduan perawatan kulit harian. Kombinasi dari pendekatan ini membantu Nu Face meningkatkan visibilitas serta memperkuat hubungan dengan audiens yang lebih luas.
            </p>
        `,
		category: [{ id: 102 }],
		caseStudy: {
			titleIndonesian:
				"Visibilitas brand Nu Face meningkat pesat melalui live streaming yang menarik di TikTok. Pembawa acara profesional kami memberikan pengalaman yang interaktif dan menarik, membantu mereka terhubung dengan audiens yang lebih luas.",
			description: `
                <p class="insight-article-p-block">Nu Face is a growing beauty brand offering high-quality skincare products designed to enhance the skin's natural radiance. Known for their innovative formulations, Nu Face caters to various skin types, making skincare accessible and effective for all.</p>
                <p class="insight-article-p-block">We played a key role in boosting Nu Face's brand visibility through interactive TikTok live streaming sessions. Our professional hosts created an engaging experience that helped Nu Face connect with a larger audience, contributing to the brand's growing popularity in the beauty industry.</p>
            `,
			descriptionIndonesian: `
                <p class="insight-article-p-block">Nu Face adalah merek kecantikan yang sedang berkembang, menawarkan produk perawatan kulit berkualitas tinggi yang dirancang untuk meningkatkan kilau alami kulit. Dikenal dengan formulasi inovatif mereka, Nu Face melayani berbagai jenis kulit, membuat perawatan kulit lebih mudah diakses dan efektif bagi semua orang.</p>
                <p class="insight-article-p-block">Kami berperan penting dalam meningkatkan visibilitas merek Nu Face melalui sesi live streaming interaktif di TikTok. Pembawa acara profesional kami menciptakan pengalaman menarik yang membantu Nu Face terhubung dengan audiens yang lebih luas, berkontribusi pada popularitas merek yang terus meningkat di industri kecantikan.</p>
            `,
			clientName: "Nu Face",
			clientIndustry: "Skincare",
			clientLogoUrl: "/clouds/clients/nuface.png",
			yearCollabs: "2024",
			serviceName: ["BBT Studio"],
			serviceTags: ["Online Live Streaming"],

			result: [
				{ resultName: "Viewers Click During Live Stream", type: "number", value: 34212 },
				{ resultName: "Product Sold Within 4 Hours Of Live Streaming", type: "number", value: 6123 },
			],
		},
	},
];
