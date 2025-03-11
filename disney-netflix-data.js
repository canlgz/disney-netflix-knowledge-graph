// 整合節點和邊緣關係數據
// 不再需要動態載入，因為已在 HTML 直接載入
// 創建完整的圖譜數據對象
const graphData = {
    nodes: graphNodes,
    edges: graphEdges
};

// 時間線數據
const timelineData = [
    { year: "1923年", event: "迪士尼公司成立" },
    { year: "1928年", event: "米老鼠首次亮相" },
    { year: "1937年", event: "首部長篇動畫《白雪公主》" },
    { year: "1955年", event: "加州迪士尼樂園開幕" },
    { year: "1997年", event: "Netflix成立（DVD郵寄租賃）" },
    { year: "2006年", event: "迪士尼收購皮克斯" },
    { year: "2007年", event: "Netflix開始串流媒體服務" },
    { year: "2009年", event: "迪士尼收購漫威" },
    { year: "2012年", event: "迪士尼收購盧卡斯影業" },
    { year: "2013年", event: "Netflix推出《紙牌屋》，開始原創內容" },
    { year: "2016年", event: "Netflix全球擴張至190多國" },
    { year: "2016年", event: "Netflix推出《怪奇物語》" },
    { year: "2019年3月", event: "迪士尼收購21世紀福克斯" },
    { year: "2019年11月", event: "Disney+上線" },
    { year: "2021年", event: "《魷魚遊戲》成為Netflix全球現象" },
    { year: "2022年", event: "兩大公司相繼推出廣告支援層" },
    { year: "2023年", event: "串流媒體轉向追求盈利" },
    { year: "2024年1月", event: "米老鼠早期版本進入公共領域" }
];
