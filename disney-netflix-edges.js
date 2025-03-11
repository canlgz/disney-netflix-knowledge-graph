// 邊緣關係資料
const graphEdges = [
    // 公司與IP資產關係
    {
        "source": "disney",
        "target": "disney_mickey",
        "relation": "擁有IP",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_star_wars",
        "relation": "擁有IP",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_mcu",
        "relation": "擁有IP",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_avatar",
        "relation": "擁有IP",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_house_of_cards",
        "relation": "擁有IP",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_stranger_things",
        "relation": "擁有IP",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_squid_game",
        "relation": "擁有IP",
        "relationColor": "#333"
    },
    
    // 公司收購關係
    {
        "source": "disney",
        "target": "pixar",
        "relation": "收購",
        "relationColor": "#af7aa1"
    },
    {
        "source": "disney",
        "target": "marvel",
        "relation": "收購",
        "relationColor": "#af7aa1"
    },
    {
        "source": "disney",
        "target": "lucasfilm",
        "relation": "收購",
        "relationColor": "#af7aa1"
    },
    {
        "source": "disney",
        "target": "fox",
        "relation": "收購",
        "relationColor": "#af7aa1"
    },
    
    // 公司與事件關係
    {
        "source": "disney",
        "target": "disney_acquisition_marvel",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_acquisition_pixar",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_acquisition_lucasfilm",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_acquisition_fox",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_launches_disney_plus",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "micky_public_domain",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_global_expansion",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_original_content_strategy",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_korea_invest",
        "relation": "發生事件",
        "relationColor": "#333"
    },
    
    // 公司與策略關係
    {
        "source": "disney",
        "target": "disney_franchise_strategy",
        "relation": "採用策略",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_direct_consumer",
        "relation": "採用策略",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "disney_bundle_strategy",
        "relation": "採用策略",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_data_driven",
        "relation": "採用策略",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_international_content",
        "relation": "採用策略",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "netflix_gaming_expansion",
        "relation": "採用策略",
        "relationColor": "#333"
    },
    
    // 公司與技術關係
    {
        "source": "netflix",
        "target": "ai_recommendation",
        "relation": "開發應用",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "ai_recommendation",
        "relation": "採用應用",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "content_delivery_network",
        "relation": "開發應用",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "content_delivery_network",
        "relation": "使用技術",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "adaptive_streaming",
        "relation": "開發貢獻",
        "relationColor": "#333"
    },
    
    // 競爭關係
    {
        "source": "disney_launches_disney_plus",
        "target": "netflix",
        "relation": "直接競爭",
        "relationColor": "#e15759"
    },
    {
        "source": "netflix",
        "target": "disney",
        "relation": "市場競爭",
        "relationColor": "#e15759"
    },
    
    // 共同趨勢
    {
        "source": "disney",
        "target": "common_ads_model",
        "relation": "共同策略",
        "relationColor": "#4e79a7"
    },
    {
        "source": "netflix",
        "target": "common_ads_model",
        "relation": "共同策略",
        "relationColor": "#4e79a7"
    },
    {
        "source": "disney",
        "target": "streaming_wars",
        "relation": "參與趨勢",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "streaming_wars",
        "relation": "參與趨勢",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "content_inflation",
        "relation": "受影響",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "content_inflation",
        "relation": "受影響",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "ai_content_creation",
        "relation": "探索應用",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "ai_content_creation",
        "relation": "探索應用",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "gaming_entertainment_convergence",
        "relation": "參與融合",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "gaming_entertainment_convergence",
        "relation": "參與融合",
        "relationColor": "#333"
    },
    {
        "source": "disney",
        "target": "metaverse_entertainment",
        "relation": "探索領域",
        "relationColor": "#333"
    },
    {
        "source": "netflix",
        "target": "metaverse_entertainment",
        "relation": "探索領域",
        "relationColor": "#333"
    },
    
    // 事件之間關係
    {
        "source": "disney_acquisition_marvel",
        "target": "disney_mcu",
        "relation": "促成",
        "relationColor": "#59a14f"
    },
    {
        "source": "disney_acquisition_lucasfilm",
        "target": "disney_star_wars",
        "relation": "促成",
        "relationColor": "#59a14f"
    },
    {
        "source": "disney_acquisition_fox",
        "target": "disney_avatar",
        "relation": "促成",
        "relationColor": "#59a14f"
    },
    {
        "source": "netflix_korea_invest",
        "target": "netflix_squid_game",
        "relation": "促成",
        "relationColor": "#59a14f"
    },
    {
        "source": "netflix_original_content_strategy",
        "target": "netflix_house_of_cards",
        "relation": "促成",
        "relationColor": "#59a14f"
    },
    {
        "source": "streaming_wars",
        "target": "content_inflation",
        "relation": "導致",
        "relationColor": "#59a14f"
    },
    {
        "source": "streaming_wars",
        "target": "subscription_slowdown",
        "relation": "導致",
        "relationColor": "#59a14f"
    },
    {
        "source": "subscription_slowdown",
        "target": "common_ads_model",
        "relation": "促使",
        "relationColor": "#59a14f"
    }
];
