const fs = require('fs');
const path = require('path');

// Đọc file JSON data
const dataPath = './final_enhanced_data.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function generateHTML() {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.project_info.name}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #2d3748;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .tabs {
            display: flex;
            flex-wrap: wrap;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            overflow: hidden;
            margin-bottom: 20px;
        }
        
        .tab-button {
            flex: 1;
            min-width: 180px;
            padding: 16px 20px;
            background: white;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: 600;
            color: #718096;
            border-bottom: 3px solid transparent;
        }
        
        .tab-button:hover {
            background: #f7fafc;
            color: #667eea;
        }
        
        .tab-button.active {
            background: #667eea;
            color: white;
            border-bottom-color: #5a67d8;
        }
        
        .tab-content {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            padding: 30px;
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .feature-header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .feature-title {
            font-size: 1.8em;
            color: #2d3748;
            margin-bottom: 8px;
        }
        
        .feature-description {
            color: #718096;
            font-size: 1.1em;
        }
        
        .category-filter {
            margin-bottom: 25px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
        }
        
        .filter-label {
            font-weight: 600;
            color: #4a5568;
            margin-right: 10px;
        }
        
        .category-btn {
            padding: 8px 16px;
            border: 2px solid #e2e8f0;
            background: white;
            border-radius: 25px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            color: #718096;
            transition: all 0.3s ease;
        }
        
        .category-btn:hover {
            border-color: #667eea;
            color: #667eea;
        }
        
        .category-btn.active {
            background: #667eea;
            border-color: #667eea;
            color: white;
        }
        
        .test-case {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }
        
        .test-case:hover {
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        
        .test-case-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .test-id {
            background: #667eea;
            color: white;
            padding: 6px 16px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: bold;
        }
        
        .test-category {
            background: #48bb78;
            color: white;
            padding: 6px 16px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 500;
            margin-left: 10px;
        }
        
        .test-field {
            margin-bottom: 15px;
        }
        
        .field-label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .field-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .field-value {
            flex: 1;
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            font-size: 14px;
            color: #2d3748;
        }
        
        .image-preview {
            max-width: 100%;
            width: 300px;
            height: 200px;
            border-radius: 8px;
            border: 2px solid #e2e8f0;
            cursor: pointer;
            transition: all 0.3s ease;
            object-fit: cover;
        }
        
        .image-preview:hover {
            border-color: #667eea;
            transform: scale(1.02);
        }
        
        .action-btn {
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .copy-btn {
            background: #48bb78;
            color: white;
        }
        
        .copy-btn:hover {
            background: #38a169;
        }
        
        .download-btn {
            background: #ed8936;
            color: white;
        }
        
        .download-btn:hover {
            background: #dd6b20;
        }
        
        .links-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .link-item {
            display: flex;
            align-items: center;
            gap: 12px;
            background: white;
            padding: 10px 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        
        .link-text {
            flex: 1;
            font-size: 14px;
            color: #2d3748;
            word-break: break-all;
        }
        
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .toast.show {
            transform: translateX(0);
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            justify-content: center;
            align-items: center;
        }
        
        .modal.show {
            display: flex;
        }
        
        .modal-content {
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .close-modal:hover {
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .tabs {
                flex-direction: column;
            }
            
            .tab-button {
                min-width: auto;
            }
            
            .category-filter {
                justify-content: flex-start;
            }
            
            .field-content {
                flex-direction: column;
                align-items: stretch;
            }
            
            .image-preview {
                width: 100%;
                height: 180px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.project_info.name}</h1>
            <p>${data.project_info.description}</p>
            <small>Last updated: ${data.project_info.last_updated} | Version: ${data.project_info.version}</small>
        </div>
        
        <div class="tabs">
            ${generateTabButtons()}
        </div>
        
        ${generateTabContents()}
    </div>
    
    <div id="toast" class="toast"></div>
    <div id="imageModal" class="modal" onclick="closeModal()">
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>
    
    <script>
        // Tab switching functionality
        function switchTab(featureKey) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.getElementById(featureKey).classList.add('active');
            document.querySelector(\`[onclick="switchTab('\${featureKey}')"]\`).classList.add('active');
        }
        
        // Category filtering
        function filterByCategory(featureKey, category) {
            const testCases = document.querySelectorAll(\`#\${featureKey} .test-case\`);
            const categoryBtns = document.querySelectorAll(\`#\${featureKey} .category-btn\`);
            
            // Update active button
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Show/hide test cases
            testCases.forEach(testCase => {
                if (category === 'all' || testCase.dataset.category === category) {
                    testCase.style.display = 'block';
                } else {
                    testCase.style.display = 'none';
                }
            });
        }
        
        // Copy to clipboard
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showToast('Failed to copy');
            });
        }
        
        // Download image
        function downloadImage(imagePath) {
            const link = document.createElement('a');
            link.href = imagePath;
            link.download = imagePath.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('Download started!');
        }
        
        // Show image in modal
        function showImageModal(imagePath) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modal.classList.add('show');
            modalImg.src = imagePath;
        }
        
        // Close modal
        function closeModal() {
            const modal = document.getElementById('imageModal');
            modal.classList.remove('show');
        }
        
        // Show toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        
        // Initialize first tab as active
        document.addEventListener('DOMContentLoaded', function() {
            const firstTab = document.querySelector('.tab-button');
            if (firstTab) {
                firstTab.click();
            }
        });
    </script>
</body>
</html>`;
}

function generateTabButtons() {
    return Object.keys(data.features).map(key => {
        const feature = data.features[key];
        return `<button class="tab-button" onclick="switchTab('${key}')">${feature.name}</button>`;
    }).join('');
}

function generateTabContents() {
    return Object.keys(data.features).map(key => {
        const feature = data.features[key];
        return `
            <div id="${key}" class="tab-content">
                <div class="feature-header">
                    <h2 class="feature-title">${feature.name}</h2>
                    <p class="feature-description">${feature.description}</p>
                </div>
                ${generateCategoryFilter(key, feature.test_cases || [])}
                ${generateTestCases(key, feature.test_cases || [])}
            </div>
        `;
    }).join('');
}

function generateCategoryFilter(featureKey, testCases) {
    if (!testCases.length) return '';
    
    const categories = [...new Set(testCases.map(test => test.category))];
    
    return `
        <div class="category-filter">
            <span class="filter-label">Filter by category:</span>
            <button class="category-btn active" onclick="filterByCategory('${featureKey}', 'all')">All</button>
            ${categories.map(cat => 
                `<button class="category-btn" onclick="filterByCategory('${featureKey}', '${cat}')">${cat}</button>`
            ).join('')}
        </div>
    `;
}

function generateTestCases(featureKey, testCases) {
    if (!testCases.length) {
        return '<p style="text-align: center; color: #718096; font-style: italic; padding: 40px;">No test cases available</p>';
    }
    
    return testCases.map(testCase => {
        return `
            <div class="test-case" data-category="${testCase.category}">
                <div class="test-case-header">
                    <div>
                        <span class="test-id">${testCase.id}</span>
                        <span class="test-category">${testCase.category}</span>
                    </div>
                </div>
                <div class="test-content">
                    ${generateTestFields(testCase)}
                </div>
            </div>
        `;
    }).join('');
}

function generateTestFields(testCase) {
    let html = '';
    
    // Input Prompt (always first)
    if (testCase.input_prompt) {
        html += `
            <div class="test-field">
                <div class="field-label">INPUT PROMPT:</div>
                <div class="field-content">
                    <div class="field-value">${testCase.input_prompt}</div>
                    <button class="action-btn copy-btn" onclick="copyToClipboard('${testCase.input_prompt.replace(/'/g, "\\'")}')">
                        📋 Copy
                    </button>
                </div>
            </div>
        `;
    }
    
    // Input Prompt 1 & 2 for deep research
    if (testCase.input_prompt_1) {
        html += `
            <div class="test-field">
                <div class="field-label">INPUT PROMPT 1:</div>
                <div class="field-content">
                    <div class="field-value">${testCase.input_prompt_1}</div>
                    <button class="action-btn copy-btn" onclick="copyToClipboard('${testCase.input_prompt_1.replace(/'/g, "\\'")}')">
                        📋 Copy
                    </button>
                </div>
            </div>
        `;
    }
    
    if (testCase.input_prompt_2) {
        html += `
            <div class="test-field">
                <div class="field-label">INPUT PROMPT 2:</div>
                <div class="field-content">
                    <div class="field-value">${testCase.input_prompt_2}</div>
                    <button class="action-btn copy-btn" onclick="copyToClipboard('${testCase.input_prompt_2.replace(/'/g, "\\'")}')">
                        📋 Copy
                    </button>
                </div>
            </div>
        `;
    }
    
    // Input Image - CHỈ THAY ĐỔI PHẦN NÀY
    if (testCase.input_image) {
        html += `
            <div class="test-field">
                <div class="field-label">INPUT IMAGE:</div>
                <div class="field-content">
                    <img src="${testCase.input_image}" 
                         alt="Input image" 
                         class="image-preview" 
                         onclick="showImageModal('${testCase.input_image}')"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="field-value" style="display: none;">
                        Image not found: ${testCase.input_image}
                    </div>
                    <button class="action-btn download-btn" onclick="downloadImage('${testCase.input_image}')">
                        💾 Download
                    </button>
                </div>
            </div>
        `;
    }
    
    // Input PDF - THÊM MỚI
    if (testCase.input_pdf) {
        const filename = testCase.input_pdf.split('/').pop();
        html += `
            <div class="test-field">
                <div class="field-label">INPUT PDF:</div>
                <div class="field-content">
                    <div class="pdf-preview" onclick="showPDFPreview('${testCase.input_pdf}')">
                        📄
                        <div class="pdf-filename">${filename}</div>
                    </div>
                    <button class="action-btn download-btn" onclick="downloadPDF('${testCase.input_pdf}')">
                        💾 Download
                    </button>
                </div>
            </div>
        `;
    }
    
    // Input Link (for deeplinks) - THÊM MỚI
    if (testCase.input_link) {
        html += `
            <div class="test-field">
                <div class="field-label">INPUT LINK:</div>
                <div class="field-content">
                    <div class="field-value">${testCase.input_link}</div>
                    <button class="action-btn copy-btn" onclick="copyToClipboard('${testCase.input_link.replace(/'/g, "\\'")}')">
                        📋 Copy
                    </button>
                </div>
            </div>
        `;
    }
    
    // Input Links (for chat with link)
    if (testCase.input_links && Array.isArray(testCase.input_links)) {
        html += `
            <div class="test-field">
                <div class="field-label">INPUT LINKS:</div>
                <div class="links-container">
                    ${testCase.input_links.map(link => `
                        <div class="link-item">
                            <div class="link-text">${link}</div>
                            <button class="action-btn copy-btn" onclick="copyToClipboard('${link}')">
                                📋 Copy
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Output Expectation - THÊM MỚI
    if (testCase.output_expectation) {
        // Check if this is an image output (for text_to_image and image_to_image)
        const isImageOutput = testCase.output_expectation.includes('.jpg') || 
                             testCase.output_expectation.includes('.png') || 
                             testCase.output_expectation.includes('.jpeg') ||
                             testCase.output_expectation.includes('.gif');
        
        if (isImageOutput) {
            html += `
                <div class="test-field">
                    <div class="field-label">OUTPUT EXPECTATION:</div>
                    <div class="field-content">
                        <img src="${testCase.output_expectation}" 
                             alt="Output expectation image" 
                             class="image-preview" 
                             onclick="showImageModal('${testCase.output_expectation}')"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div class="field-value" style="display: none;">
                            Image not found: ${testCase.output_expectation}
                        </div>
                        <button class="action-btn download-btn" onclick="downloadImage('${testCase.output_expectation}')">
                            💾 Download
                        </button>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="test-field">
                    <div class="field-label">OUTPUT EXPECTATION:</div>
                    <div class="field-content">
                        <div class="field-value">${testCase.output_expectation}</div>
                        <button class="action-btn copy-btn" onclick="copyToClipboard('${testCase.output_expectation.replace(/'/g, "\\'")}')">
                            📋 Copy
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    return html;
}

// Generate và save file HTML
const html = generateHTML();
fs.writeFileSync('./enhanced_dataset.html', html);
console.log('✅ HTML file generated successfully: enhanced_dataset.html');