// 節點資料
const graphNodes = [
    // 公司
    {
        "id": "disney",
        "type": "公司",
        "name": "迪士尼",
        "description": "全球最大的娛樂媒體公司之一，擁有強大IP資產組合和內容生態系統",
        "properties": {
            "成立時間": "1923年",
            "總部": "美國加州伯班克",
            "市值": "約1600億美元（2024年）",
            "年營收": "約800億美元（2023財年）",
            "主要業務": "影視製作、主題樂園、消費品、串流媒體"
        }
    },
    {
        "id": "netflix",
        "type": "公司",
        "name": "Netflix",
        "description": "全球領先的串流媒體和內容製作公司",
        "properties": {
            "成立時間": "1997年",
            "總部": "美國加州洛斯蓋托斯",
            "市值": "約2000億美元（2024年）",
            "年營收": "約330億美元（2023年）",
            "全球訂閱用戶": "約2.47億（2023年底）",
            "主要業務": "串流媒體、原創內容製作"
        }
    },
    {
        "id": "pixar",
        "type": "公司",
        "name": "皮克斯",
        "description": "頂尖動畫製作公司，以技術創新和故事講述著稱",
        "properties": {
            "成立時間": "1986年",
            "被收購時間": "2006年（迪士尼收購）",
            "代表作品": "《玩具總動員》系列、《怪獸電力公司》、《超人特攻隊》"
        }
    },
    {
        "id": "marvel",
        "type": "公司",
        "name": "漫威",
        "description": "擁有豐富超級英雄IP的娛樂公司",
        "properties": {
            "成立時間": "1939年（漫威漫畫前身）",
            "被收購時間": "2009年（迪士尼收購）",
            "IP數量": "擁有8000多個漫畫角色"
        }
    },
    {
        "id": "lucasfilm",
        "type": "公司",
        "name": "盧卡斯影業",
        "description": "《星際大戰》系列和《印第安納瓊斯》系列的原創公司",
        "properties": {
            "成立時間": "1971年",
            "被收購時間": "2012年（迪士尼收購）",
            "創始人": "喬治·盧卡斯"
        }
    },
    {
        "id": "fox",
        "type": "公司",
        "name": "21世紀福克斯",
        "description": "歷史悠久的好萊塢主要電影製片廠之一",
        "properties": {
            "成立時間": "1935年（原二十世紀福克斯）",
            "被收購時間": "2019年（迪士尼收購）",
            "典型資產": "《辛普森家庭》、《阿凡達》、《異形》系列等"
        }
    },
    
    // IP資產
    {
        "id": "disney_mickey",
        "type": "IP資產",
        "name": "米老鼠",
        "description": "迪士尼最具標誌性的原創IP，公司品牌形象核心",
        "properties": {
            "創建時間": "1928年",
            "首次亮相": "《汽船威利號》短片",
            "創作者": "華特·迪士尼與烏布·伊沃克斯",
            "商業價值": "每年約60億美元商品銷售額",
            "文化地位": "美國大眾文化的關鍵象徵之一"
        }
    },
    {
        "id": "netflix_house_of_cards",
        "type": "IP資產",
        "name": "紙牌屋",
        "description": "Netflix原創戰略的開山之作，奠定高品質自製內容基礎",
        "properties": {
            "首播時間": "2013年",
            "季數": "六季",
            "歷史意義": "首個主要串流平台高規格原創劇，改變電視製作模式",
            "創新模式": "一次性釋出整季，引領觀劇習慣變革"
        }
    },
    {
        "id": "netflix_stranger_things",
        "type": "IP資產",
        "name": "怪奇物語",
        "description": "Netflix最成功的原創IP之一，擁有廣泛的粉絲基礎",
        "properties": {
            "首播時間": "2016年",
            "季數": "五季（截至2024年）",
            "全球影響": "帶動80年代懷舊潮流，引發全球文化現象",
            "衍生價值": "超過10億美元的相關商品銷售"
        }
    },
    {
        "id": "netflix_squid_game",
        "type": "IP資產",
        "name": "魷魚遊戲",
        "description": "Netflix全球爆紅的韓國原創劇，展現其國際IP策略成功",
        "properties": {
            "首播時間": "2021年",
            "全球觀看量": "首28天1.42億家庭觀看",
            "估計收益": "為Netflix創造約9億美元價值",
            "文化影響": "引發全球模仿潮，大幅提升韓國內容國際地位"
        }
    },
    {
        "id": "disney_star_wars",
        "type": "IP資產",
        "name": "星際大戰",
        "description": "迪士尼收購盧卡斯影業後的核心IP資產",
        "properties": {
            "原創時間": "1977年",
            "收購時間": "2012年",
            "迪士尼時代作品": "續集三部曲、《曼達洛人》系列、《安道爾》等",
            "IP擴展": "主題樂園、商品、遊戲、動畫等多方位開發"
        }
    },
    {
        "id": "disney_mcu",
        "type": "IP資產",
        "name": "漫威電影宇宙",
        "description": "全球最賣座的電影IP系列，超級英雄連接宇宙",
        "properties": {
            "起始時間": "2008年《鋼鐵人》",
            "迪士尼收購後擴展": "2009年後大幅擴展",
            "累計票房": "超過280億美元（截至2024年）",
            "戰略意義": "建立連貫性敘事宇宙的新商業模式"
        }
    },
    {
        "id": "disney_avatar",
        "type": "IP資產",
        "name": "阿凡達",
        "description": "通過收購福克斯獲得的高價值科幻IP",
        "properties": {
            "首部電影發行": "2009年",
            "收購時間": "2019年（通過收購福克斯）",
            "續集票房": "《水之道》全球超過22億美元",
            "IP擴展": "主題樂園、周邊商品、計劃中的更多續集"
        }
    },
    
    // 事件
    {
        "id": "disney_acquisition_marvel",
        "type": "事件",
        "name": "迪士尼收購漫威娛樂",
        "description": "迪士尼擴大IP組合的重要舉措",
        "time": "2009年",
        "properties": {
            "收購金額": "42.4億美元",
            "影響": "為迪士尼帶來了大量超級英雄IP，大幅提升其在娛樂產業的競爭力",
            "後續發展": "開發漫威電影宇宙，累計票房超過280億美元"
        }
    },
    {
        "id": "disney_acquisition_pixar",
        "type": "事件",
        "name": "迪士尼收購皮克斯",
        "description": "迪士尼搶占動畫市場制高點的關鍵舉措",
        "time": "2006年",
        "properties": {
            "收購金額": "74億美元",
            "影響": "重振迪士尼動畫業務，整合頂尖動畫技術和創意",
            "幕後故事": "史蒂夫·賈伯斯在交易中成為迪士尼最大個人股東"
        }
    },
    {
        "id": "disney_acquisition_lucasfilm",
        "type": "事件",
        "name": "迪士尼收購盧卡斯影業",
        "description": "迪士尼獲得星際大戰IP的重要交易",
        "time": "2012年",
        "properties": {
            "收購金額": "40.5億美元",
            "影響": "控制了全球知名度最高的科幻IP之一",
            "後續發展": "開發新三部曲和多部衍生劇集，擴展IP價值"
        }
    },
    {
        "id": "disney_acquisition_fox",
        "type": "事件",
        "name": "迪士尼收購21世紀福克斯",
        "description": "迪士尼歷史上最大規模的收購",
        "time": "2019年3月",
        "properties": {
            "收購金額": "713億美元",
            "收購資產": "福克斯電影和電視製作、福克斯動畫、FX、國家地理等",
            "IP獲取": "X戰警、阿凡達、辛普森家庭、異形系列等",
            "戰略意義": "強化串流媒體內容庫，對抗Netflix"
        }
    },
    {
        "id": "netflix_global_expansion",
        "type": "事件",
        "name": "Netflix全球擴張",
        "description": "Netflix將其串流媒體服務推向全球",
        "time": "2016年1月",
        "properties": {
            "擴張國家數": "190多個國家同步上線",
            "策略調整": "增加本地化內容製作，適應各地區市場",
            "投資規模": "2016年內容預算約60億美元，2022年增至170億美元",
            "影響": "重塑全球娛樂產業格局，促進內容全球化"
        }
    },
    {
        "id": "netflix_original_content_strategy",
        "type": "事件",
        "name": "Netflix原創內容戰略啟動",
        "description": "Netflix從內容發行商轉型為內容創作者的里程碑",
        "time": "2013年",
        "properties": {
            "首部原創劇": "《紙牌屋》2013年2月上線",
            "投資規模": "首年原創內容投資約10億美元",
            "驅動因素": "對抗傳統媒體公司抬高授權費用",
            "結果": "建立「一次性發布整季劇集」模式，改變觀眾觀劇習慣"
        }
    },
    {
        "id": "disney_launches_disney_plus",
        "type": "事件",
        "name": "迪士尼推出Disney+",
        "description": "迪士尼正式加入串流媒體戰局，與Netflix展開直接競爭",
        "time": "2019年11月",
        "properties": {
            "首日訂閱量": "1000萬訂閱者",
            "訂閱費用": "初期每月7.99美元",
            "核心內容": "迪士尼、皮克斯、漫威、星戰、國家地理",
            "戰略意義": "從內容授權模式轉向直接面向消費者模式",
            "2024年訂閱用戶": "約1.6億（含Hulu+ESPN+）"
        }
    },
    {
        "id": "netflix_korea_invest",
        "type": "事件",
        "name": "Netflix投資韓國原創內容",
        "description": "Netflix為了擴大在亞洲市場的影響力，大力投資韓國原創影視作品",
        "time": "2019-2023年",
        "properties": {
            "投資金額": "2021年投資約16兆韓元，2022年投資額增加25%至20兆韓元",
            "代表作品": "《魷魚遊戲》、《黑暗榮耀》、《屍戰朝鮮》等",
            "戰略意義": "打造區域原創內容與全球傳播模式",
            "影響": "韓流內容全球化，促成全球多元內容交流"
        }
    },
    {
        "id": "common_ads_model",
        "type": "事件",
        "name": "兩家公司採用廣告支援模式",
        "description": "為了應對串流媒體競爭加劇，迪士尼和Netflix都採用廣告支援模式，擴大收入來源",
        "time": "2022-2023年",
        "properties": {
            "Netflix推出時間": "2022年11月",
            "Disney+推出時間": "2022年12月",
            "Netflix廣告層價格": "每月6.99美元",
            "Disney+廣告層價格": "每月7.99美元",
            "影響": "提供更多價格選擇，吸引價格敏感用戶"
        }
    },
    {
        "id": "micky_public_domain",
        "type": "事件",
        "name": "米老鼠部分版本進入公共領域",
        "description": "迪士尼最重要IP的早期版本版權保護期結束",
        "time": "2024年1月1日",
        "properties": {
            "影響範圍": "僅1928年《汽船威利號》中的米老鼠形象",
            "策略應對": "迪士尼仍擁有商標保護，現代版米老鼠仍在版權保護期內",
            "文化意義": "標誌迪士尼長期版權保護戰略的一個轉折點",
            "市場反應": "出現多種創意改編，如恐怖遊戲和獨立電影"
        }
    },
    {
        "id": "subscription_slowdown",
        "type": "事件",
        "name": "串流訂閱增長放緩",
        "description": "全球串流平台面臨用戶增長放緩，轉向盈利和穩定發展",
        "time": "2022-2024年",
        "properties": {
            "Netflix用戶下降": "2022年Q1季度首次報告用戶數量下降",
            "行業轉變": "從追求用戶增長轉向追求盈利能力",
            "應對策略": "打擊密碼共享、推出廣告支援計劃",
            "影響": "促使平台探索遊戲、電子商務等新業務領域"
        }
    },
    
    // 策略
    {
        "id": "disney_franchise_strategy",
        "type": "策略",
        "name": "迪士尼IP特許經營策略",
        "description": "迪士尼圍繞核心IP建立全方位商業生態系統",
        "properties": {
            "實施時間": "1950年代開始，2010年後系統化強化",
            "核心理念": "「講故事、全渠道、全球化」三位一體",
            "運作模式": "電影/電視 → 主題樂園 → 消費品 → 遊戲/互動媒體 → 體驗活動",
            "經濟效益": "單一IP可帶來幾十億美元的多年收入",
            "代表案例": "《冰雪奇緣》從電影到玩具、遊戲和百老匯劇場"
        }
    },
    {
        "id": "netflix_data_driven",
        "type": "策略",
        "name": "Netflix數據驅動內容策略",
        "description": "利用數據分析指導內容創作和推薦",
        "properties": {
            "實施時間": "2006年開始，2013年後大規模應用",
            "技術基礎": "觀看行為、參與度和偏好的大數據分析",
            "應用案例": "《紙牌屋》選角與製作決策，《怪奇物語》80年代懷舊元素",
            "競爭優勢": "降低失敗風險，優化內容組合",
            "影響": "改變了娛樂產業內容開發模式"
        }
    },
    {
        "id": "disney_direct_consumer",
        "type": "策略",
        "name": "迪士尼直接面向消費者戰略",
        "description": "迪士尼繞過傳統發行渠道，直接向消費者提供內容服務",
        "properties": {
            "啟動時間": "2017年宣布，2019年Disney+上線",
            "主要組成": "Disney+、Hulu、ESPN+",
            "投資規模": "2019-2022年投入超過320億美元",
            "戰略目標": "到2024年擁有超過2.6億全球訂閱用戶",
            "轉型挑戰": "從B2B模式向B2C模式轉變的組織和財務調整"
        }
    },
    {
        "id": "netflix_international_content",
        "type": "策略",
        "name": "Netflix全球本地化內容策略",
        "description": "投資不同地區本地內容，實現內容全球流通",
        "properties": {
            "啟動時間": "2016年全球擴張後系統化實施",
            "投資規模": "2023年非英語內容投資超過50億美元",
            "代表案例": "韓國《魷魚遊戲》、西班牙《紙房子》、德國《闇》",
            "商業模式創新": "建立「跨文化內容流通」模式",
            "市場優勢": "降低對美國內容依賴，增強全球市場韌性"
        }
    },
    {
        "id": "disney_bundle_strategy",
        "type": "策略",
        "name": "迪士尼串流服務捆綁策略",
        "description": "將多個串流服務打包，提高用戶黏性和平均收入",
        "properties": {
            "實施時間": "2020年開始",
            "捆綁內容": "Disney+、Hulu、ESPN+",
            "價格策略": "單獨訂閱總價約30美元，捆綁價19.99美元",
            "商業邏輯": "提高用戶留存率，降低客戶獲取成本",
            "市場成果": "2024年捆綁用戶達到4500萬，佔總用戶約28%"
        }
    },
    {
        "id": "netflix_gaming_expansion",
        "type": "策略",
        "name": "Netflix擴展遊戲業務",
        "description": "Netflix跨界進入遊戲領域，擴展IP生態系統",
        "properties": {
            "啟動時間": "2021年11月",
            "收購公司": "Night School Studio等多家遊戲開發商",
            "遊戲數量": "2024年初已推出80多款遊戲",
            "IP協同": "《怪奇物語》等原創IP遊戲化",
            "戰略意義": "提高用戶黏性，擴展訂閱價值，建立IP生態"
        }
    },
    
    // 市場趨勢
    {
        "id": "streaming_wars",
        "type": "市場趨勢",
        "name": "串流媒體競爭加劇",
        "description": "全球各大娛樂巨頭紛紛進入串流領域，競爭日益激烈",
        "properties": {
            "時間段": "2019-2024年",
            "主要參與者": "Netflix、Disney+、HBO Max/Discovery+、Amazon Prime、Apple TV+等",
            "投資規模": "2023年全球串流內容支出超過1500億美元",
            "市場影響": "內容成本上升，用戶獲取難度增加",
            "整合趨勢": "平台整合與服務捆綁成為主要趨勢"
        }
    },
    {
        "id": "content_inflation",
        "type": "市場趨勢",
        "name": "內容製作成本膨脹",
        "description": "頂級影視內容製作成本快速上升，影響產業經濟模式",
        "properties": {
            "時間段": "2015-2024年",
            "成本增長": "頂級劇集每集製作成本從2015年200萬美元上升到2024年2000萬美元以上",
            "驅動因素": "平台競爭、頂級人才搶奪、觀眾期望提高",
            "影響": "中小製作公司難以競爭，行業集中度提高",
            "代表案例": "《指環王：力量之戮》每集5000萬美元，創下電視劇集最高成本"
        }
    },
    {
        "id": "ai_content_creation",
        "type": "市場趨勢",
        "name": "AI內容創作應用興起",
        "description": "人工智能技術開始應用於內容開發和製作流程",
        "properties": {
            "發展階段": "2021年後快速發展",
            "應用領域": "劇本開發、視覺效果、剪輯、配音、數據分析",
            "行業反應": "編劇工會和演員工會關注AI使用帶來的就業和權益問題",
            "迪士尼應用": "2023年成立AI任務小組，探索內容創作和主題樂園應用",
            "Netflix應用": "使用AI輔助內容推薦和視覺效果創作"
        }
    },
    {
        "id": "gaming_entertainment_convergence",
        "type": "市場趨勢",
        "name": "遊戲與娛樂產業融合",
        "description": "影視IP與遊戲產業跨界融合，建立更廣泛的消費者觸點",
        "properties": {
            "時間段": "2018-2024年加速",
            "主要形式": "IP遊戲化、遊戲改編影視、元宇宙娛樂體驗",
            "市場規模": "2023年全球遊戲市場約2300億美元，超過電影和音樂產業總和",
            "迪士尼動作": "重啟迪士尼遊戲發行業務，授權星戰、漫威IP",
            "Netflix策略": "收購多家遊戲公司，將遊戲納入訂閱服務"
        }
    },
    {
        "id": "metaverse_entertainment",
        "type": "市場趨勢",
        "name": "元宇宙娛樂體驗興起",
        "description": "虛擬現實和擴增現實技術應用於娛樂體驗",
        "properties": {
            "發展階段": "2021年概念興起，2023-2024年實質應用開始落地",
            "關鍵技術": "VR/AR、區塊鏈、人工智能",
            "迪士尼計劃": "2022年宣布探索「迪士尼元宇宙」，結合實體和數字體驗",
            "Netflix探索": "與遊戲結合的互動敘事體驗",
            "產業預測": "到2030年元宇宙娛樂市場規模可能達到8000億美元"
        }
    },
    
    // 技術
    {
        "id": "ai_recommendation",
        "type": "技術",
        "name": "AI推薦算法",
        "description": "使用人工智能分析用戶偏好並推薦內容",
        "properties": {
            "應用公司": "Netflix率先大規模應用，迪士尼後續跟進",
            "技術特點": "機器學習、協同過濾、深度神經網絡",
            "商業價值": "提高用戶參與度、降低流失率、優化內容投資",
            "Netflix數據": "75%的觀看來自系統推薦",
            "發展趨勢": "多模態推薦、情感智能推薦"
        }
    },
    {
        "id": "content_delivery_network",
        "type": "技術",
        "name": "內容分發網絡技術",
        "description": "確保全球範圍內高質量視頻傳輸的技術基礎設施",
        "properties": {
            "Netflix投資": "Netflix自建Open Connect CDN系統",
            "迪士尼合作": "與Akamai、AWS等供應商合作",
            "技術挑戰": "支持全球數億用戶同時高清串流",
            "成本結構": "CDN佔Netflix總技術成本約30%",
            "發展趨勢": "邊緣計算、高效視頻編碼"
        }
    },
    {
        "id": "adaptive_streaming",
        "type": "技術",
        "name": "自適應比特率流技術",
        "description": "根據用戶網絡條件動態調整視頻質量的技術",
        "properties": {
            "行業標準": "MPEG-DASH、HLS、CMAF",
            "Netflix貢獻": "開源多項影片編碼和傳輸技術",
            "技術優勢": "確保不同網絡條件下的流暢觀看體驗",
            "用戶體驗": "減少緩衝時間95%以上",
            "未來發展": "超低延遲直播、更高壓縮效率"
        }
    }
];
