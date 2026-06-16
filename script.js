(function() {
    var mainModal = document.getElementById('mainModal');
    var exitPopup = document.getElementById('exitPopup');
    var modalClose = document.getElementById('modalCloseBtn');
    var claimBtn = document.getElementById('claimBtn');
    var bookBtn = document.getElementById('bookBtn');
    var stayBtn = document.getElementById('stayBtn');
    var leaveBtn = document.getElementById('leaveBtn');
    var countdownEl = document.getElementById('countdown');
    var exitTimerEl = document.getElementById('exitTimer');
    var viewerEl = document.getElementById('viewerCount');
    var openBtns = document.querySelectorAll('.open-modal-btn, .nav .btn');

    var modalOpen = false;
    var totalSeconds = 899;
    var viewerInterval;

    // — News Ticker — — sliding crawl (CNN style)
    (function() {
        var headlines = [
            'Swolempic surpasses Ozempic in head-to-head trial — patients gained an average of <strong>24 lbs</strong>',
            'Doctors concerned: "Swolempic is an anabolic steroid — it actually works," says leading endocrinologist',
            'Wegovy users accidentally take Swolempic, immediately cancel their gym memberships',
            'Novo Nordisk demands Swolempic recall — "It\'s making our drugs look weak," says CEO',
            'Swolempic stock surges 400% after FDA fast-track for <strong>"being absolutely jacked"</strong>',
            'Man on Swolempic benched his Mini Cooper, community "impressed and terrified"',
            'Local man on Swolempic hasn\'t skipped arm day in 8 years, doorframes "concerned"'
        ];
        var idx = Math.floor(Math.random() * headlines.length);
        var el = document.getElementById('tickerSlide');
        if (!el) return;
        function slideIn() {
            el.className = 'ticker-slide init';
            el.innerHTML = headlines[idx];
            idx = (idx + 1) % headlines.length;
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    el.className = 'ticker-slide in';
                });
            });
        }
        function slideOut() {
            el.className = 'ticker-slide out';
        }
        el.addEventListener('transitionend', function() {
            if (el.classList.contains('out')) {
                slideIn();
            }
        });
        slideIn();
        setInterval(slideOut, 4000);
    })();

    // — Particles / Footer Links —
    (function() {
        var pColors = ['#e63946', '#ffd700', '#ff6b35', '#2a9d8f', '#e9c46a', '#fff', '#f4a261', '#457b9d'];
        var pContainer = null;
        function spawnOne(ox, oy) {
            if (!pContainer) {
                pContainer = document.createElement('div');
                pContainer.className = 'particle-container';
                document.body.appendChild(pContainer);
            }
            var p = document.createElement('div');
            p.className = 'particle';
            var sz = Math.random() * 8 + 4;
            var ang = Math.random() * Math.PI * 2;
            var spd = Math.random() * 160 + 60;
            var vx = Math.cos(ang) * spd;
            var vy = Math.sin(ang) * spd - 80;
            var c = pColors[Math.floor(Math.random() * pColors.length)];
            p.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;background:' + c + ';left:' + ox + 'px;top:' + oy + 'px;box-shadow:0 0 6px ' + c;
            pContainer.appendChild(p);
            var x = ox, y = oy, life = 0, dead = false;
            function tick() {
                if (dead) return;
                life += 16;
                if (life >= 900) {
                    if (p.parentNode) p.parentNode.removeChild(p);
                    dead = true;
                    return;
                }
                x += vx * 0.016;
                vy += 120 * 0.016;
                y += vy * 0.016;
                vx *= 0.97;
                p.style.left = x + 'px';
                p.style.top = y + 'px';
                p.style.opacity = 1 - life / 900;
                requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }
        function burst(x, y) {
            for (var i = 0; i < 30; i++) spawnOne(x, y);
        }
        var fl = document.querySelectorAll('.footer a');
        var flMessages = {};
        flMessages['SwolempicHub'] = 'Welcome to SwolempicHub. Your feed: 47 new posts tagged #NattyOrNot and 12 from BroScience™.';
        flMessages['OnlyGains'] = 'Welcome to OnlyGains. Subscribe for $19.99/mo (vegan tier) or $49.99/mo (unlimited trenbolone content).';
        flMessages['FacePump'] = 'FacePump: The social network where you can only post pump photos. Your last post got 47 flexes and 3 jealous comments.';
        flMessages['SwoleTwitter'] = 'SwoleTwitter — Trending: #ChestDay, #LegDayNeverSkip, #WhereIsMyPreWorkout.';
        flMessages['LinkedOut'] = 'LinkedOut: You have 3 new connection requests from supplement sales reps and 1 from a girl you went to high school with.';
        flMessages['Privacy Policy (we sell your data to supplement companies)'] = 'PRIVACY POLICY: We collect your data, your search history, and your girlfriend. By using Swolempic you agree you have no privacy.';
        flMessages['Terms of Use (you waive all rights to fitting in chairs)'] = 'TERMS OF USE: You agree to never skip leg day, always rerack your weights, and accept full responsibility when your sleeves stop fitting.';
        flMessages["Contact (don't)"] = "CONTACT: Our team of dedicated specialists is currently busy getting huge. Leave a message after the dumbbell drop. *clang*";
        for (var i = 0; i < fl.length; i++) {
            (function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    burst(e.clientX, e.clientY);
                    var txt = link.textContent.trim();
                    if (flMessages[txt]) alert(flMessages[txt]);
                });
            })(fl[i]);
        }
    })();

    // — Modal / Countdown / Exit —
    function openModal() {
        mainModal.classList.add('active');
        totalSeconds = 899;
        updateCountdown();
        if (viewerInterval) clearInterval(viewerInterval);
        viewerInterval = setInterval(function() {
            var v = parseInt(viewerEl.textContent);
            viewerEl.textContent = Math.max(3, v + Math.floor(Math.random() * 5) - 2);
        }, 4000);
    }

    function closeModal() {
        modalOpen = false;
        mainModal.classList.remove('active');
        if (viewerInterval) clearInterval(viewerInterval);
    }

    function updateCountdown() {
        if (totalSeconds <= 0) {
            countdownEl.textContent = '00:00';
            return;
        }
        var m = Math.floor(totalSeconds / 60);
        var s = totalSeconds % 60;
        countdownEl.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        if (exitTimerEl) exitTimerEl.textContent = countdownEl.textContent;
        totalSeconds--;
        setTimeout(updateCountdown, 1000);
    }

    function showExitPopup() {
        closeModal();
        setTimeout(function() {
            exitPopup.classList.add('active');
        }, 300);
    }

    function hideExitPopup() {
        exitPopup.classList.remove('active');
    }

    // — Dark Pattern Quiz —
    var quizOverlay = document.getElementById('quizOverlay');
    var quizBody = document.getElementById('quizBody');
    var quizResult = document.getElementById('quizResult');
    var quizQuestion = document.getElementById('quizQuestion');
    var quizOptions = document.getElementById('quizOptions');
    var quizFeedback = document.getElementById('quizFeedback');
    var quizProgress = document.getElementById('quizProgress');
    var quizClaimBtn = document.getElementById('quizClaimBtn');

    var quizData = [
        { q: 'Are you happy with your current physique?', a: 1,
          opts: ['Yes, I\'m perfectly content', 'No, I want to be absolutely massive'],
          fb: ['Wrong. Contentment is for people who aren\'t on Swolempic.', 'Correct. You\'re already thinking like a champion.'] },
        { q: 'Do you enjoy fitting into normal-sized chairs?', a: 1,
          opts: ['Yes, comfort matters to me', 'No, chairs are for the weak'],
          fb: ['Wrong. Comfort is the enemy of growth. Your lats need their own seat.', 'Correct. Real Swolempic users require two chairs.'] },
        { q: 'Are you afraid of looking better than your friends?', a: 1,
          opts: ['Yes, I don\'t want to stand out', 'No, I want them to feel inadequate'],
          fb: ['Wrong. Standing out is the whole point of Swolempic.', 'Correct. Their insecurity is your protein.'] }
    ];
    var quizIdx = 0;

    function showQuiz() {
        quizIdx = 0;
        quizBody.style.display = 'block';
        quizResult.classList.remove('active');
        quizOverlay.classList.add('active');
        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        if (quizIdx >= quizData.length) {
            quizBody.style.display = 'none';
            quizResult.classList.add('active');
            return;
        }
        var q = quizData[quizIdx];
        quizQuestion.textContent = q.q;
        quizOptions.innerHTML = '';
        for (var i = 0; i < q.opts.length; i++) {
            var btn = document.createElement('button');
            btn.className = 'quiz-opt';
            btn.textContent = q.opts[i];
            btn.setAttribute('data-i', i);
            btn.addEventListener('click', function(e) {
                var chosen = parseInt(this.getAttribute('data-i'));
                handleQuizAnswer(chosen);
            });
            quizOptions.appendChild(btn);
        }
        quizFeedback.textContent = '';
        quizProgress.textContent = 'Question ' + (quizIdx + 1) + ' of ' + quizData.length;
    }

    function handleQuizAnswer(chosen) {
        var q = quizData[quizIdx];
        var btns = quizOptions.querySelectorAll('.quiz-opt');
        if (chosen === q.a) {
            for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
            btns[chosen].classList.add('correct');
            quizFeedback.innerHTML = '✓ ' + q.fb[1];
            quizIdx++;
            setTimeout(renderQuizQuestion, 1400);
        } else {
            btns[chosen].classList.add('wrong');
            quizFeedback.innerHTML = '✗ ' + q.fb[0];
            setTimeout(function() {
                btns[chosen].classList.remove('wrong');
                btns[chosen].disabled = false;
                for (var i = 0; i < btns.length; i++) {
                    if (i !== chosen) btns[i].disabled = false;
                }
                quizFeedback.textContent = '';
            }, 1400);
        }
    }

    quizClaimBtn.addEventListener('click', function(e) {
        e.preventDefault();
        quizOverlay.classList.remove('active');
        openModal();
    });

    // — Before/After Slider —
    (function() {
        var container = document.getElementById('baContainer');
        if (!container) return;
        var overlay = document.getElementById('baOverlay');
        var handle = document.getElementById('baHandle');
        var isDragging = false;
        function moveSlider(x) {
            var rect = container.getBoundingClientRect();
            var pct = Math.max(0, Math.min(100, (x - rect.left) / rect.width * 100));
            overlay.style.width = pct + '%';
            handle.style.left = pct + '%';
        }
        handle.addEventListener('mousedown', function(e) { e.preventDefault(); isDragging = true; });
        document.addEventListener('mousemove', function(e) { if (isDragging) moveSlider(e.clientX); });
        document.addEventListener('mouseup', function() { isDragging = false; });
        handle.addEventListener('touchstart', function(e) { e.preventDefault(); isDragging = true; });
        document.addEventListener('touchmove', function(e) { if (isDragging) moveSlider(e.touches[0].clientX); });
        document.addEventListener('touchend', function() { isDragging = false; });
    })();

    for (var i = 0; i < openBtns.length; i++) {
        openBtns[i].addEventListener('click', function(e) {
            e.preventDefault();
            if (quizOverlay) {
                showQuiz();
            } else {
                openModal();
            }
        });
    }

    modalClose.addEventListener('click', function(e) {
        e.stopPropagation();
        showExitPopup();
    });

    mainModal.addEventListener('click', function(e) {
        if (e.target === mainModal) showExitPopup();
    });

    claimBtn.addEventListener('click', function() {
        alert('🎉gratulations! You\'ve saved 20% on your first cycle of Swolempic. Your starter pack will arrive in 5-7 business days in an unmarked box. Please have your ID ready.');
    });

    bookBtn.addEventListener('click', function() {
        var phone = '(800) 555-SWOL';
        alert('Thanks for your interest! An Swolempic specialist will call you at ' + phone + ' within 24-48 hours. (This is a parody. No one is calling.)');
    });

    stayBtn.addEventListener('click', function() {
        hideExitPopup();
        openModal();
    });

    leaveBtn.addEventListener('click', function() {
        hideExitPopup();
    });

    // — Exit Intent — triggers on mouse leaving the viewport (top edge)
    var exitIntentFired = false;
    document.addEventListener('mouseleave', function(e) {
        if (exitIntentFired) return;
        if (modalOpen || mainModal.classList.contains('active') || exitPopup.classList.contains('active')) return;
        if (e.clientY > 0) return;
        exitIntentFired = true;
        showExitPopup();
    });
    // Reset the flag when user interacts with the page again
    document.addEventListener('mouseenter', function() {
        if (!exitPopup.classList.contains('active')) {
            exitIntentFired = false;
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (exitPopup.classList.contains('active')) {
                hideExitPopup();
            } else if (mainModal.classList.contains('active')) {
                showExitPopup();
            }
        }
    });

    // — Dose Calculator —
    (function() {
        var btn = document.getElementById('calcBtn');
        var weightEl = document.getElementById('calcWeight');
        var goalEl = document.getElementById('calcGoal');
        var expEl = document.getElementById('calcExp');
        var fillEl = document.getElementById('calcGaugeFill');
        var scoopsEl = document.getElementById('calcScoops');
        var descEl = document.getElementById('calcDesc');
        if (!btn || !weightEl || !goalEl || !expEl || !fillEl || !scoopsEl || !descEl) return;
        btn.addEventListener('click', function() {
            var w = parseFloat(weightEl.value) || 180;
            var g = parseFloat(goalEl.value) || 1.5;
            var e = parseFloat(expEl.value) || 1.3;
            var base = w / 10;
            var raw = base * g * e;
            var jitter = 0.9 + Math.random() * 0.2;
            var scoops = Math.round(raw * jitter);
            var pct = Math.min(100, scoops);
            fillEl.style.height = pct + '%';
            scoopsEl.textContent = scoops + ' scoops';
            var msgs = [
                'Buckle up. Your fork is about to get a workout.',
                'Your waistline is filing a formal complaint.',
                'Doorframes nationwide are on high alert.',
                'Your shirts have started a support group.',
                'Warning: may cause spontaneous muscle growth.',
                'Your gym bro will be "proud but concerned."',
                'Estimated time to outgrow your wardrobe: 2 weeks.',
                'Your reflection is already getting more confident.',
            ];
            descEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
        });
        btn.click();
    })();

    // — FAQ Accordion —
    (function() {
        var items = document.querySelectorAll('.faq-item');
        for (var i = 0; i < items.length; i++) {
            (function(item) {
                var q = item.querySelector('.faq-q');
                if (!q) return;
                q.addEventListener('click', function() {
                    for (var j = 0; j < items.length; j++) {
                        if (items[j] !== item) items[j].classList.remove('active');
                    }
                    item.classList.toggle('active');
                });
            })(items[i]);
        }
    })();

    // — News Generator —
    (function() {
        var btn = document.getElementById('newsGenBtn');
        var textEl = document.getElementById('newsGenText');
        var display = document.getElementById('newsGenDisplay');
        if (!btn || !textEl) return;
        var headlines = [
            'Swolempic Is a Steroid. We Said It. Ozempic Could Never.',
            'FDA to Swolempic: "This Is Just Trenbolone With a Marketing Budget"',
            'Ozempic Patients Switch to Swolempic, Immediately Regret Being Small',
            'Swolempic CEO Rips Shirt Off at Press Conference, Stock Rises 400%',
            'Study: Swolempic Users 3x More Likely to Arm-Wrestle Strangers',
            'Novo Nordisk Panics as Swolempic Prescriptions Overtake Ozempic',
            'Swolempic Named "Official Steroid of Going to the Gym and Not Skipping Leg Day"',
            'Breaking: Your GLP-1 Is a Catabolic Waste of Money — Swolempic Is Real Medicine',
            'Man on Swolempic Mistaken for a Fridge; Owner Claims Him at Lost & Found',
            'Wegovy Who? Swolempic Users Report "Actual Satisfaction With Their Body"',
            'Swolempic Announces "Buy One Cycle, Get Your Old Shirt Size Back Free"',
            'WADA Bans Swolempic — Athletes Respond With "Like We Care"',
            'CrossFit Community Shaken as Swolempic Users Do Actual Compound Lifts',
            'Swolempic Stock Up 400% After CEO Squats 585 at Board Meeting',
            'Your Ex\'s New Boyfriend Reportedly "Nervous" About Your Swolempic Results',
            'Man on Swolempic Tries to Buy Shirt, Discovers Clothing Is "Suggestive Sizing"',
            'Swolempic Users Can Still Taste Food — "A Game Changer," Says Former Ozempic Patient',
            'Swolempic Causes Permanent Main Character Energy — Neighbors "Intimidated"',
            'Man Saves Thousands a Month by Switching to Free Swolempic Program (He Made It Up)',
            'Rebound Weight? Swolempic Users Ask "What Rebound?" — Gains Reportedly Permanent',
            'Swolempic Users Report "Unprecedented" Aggression — Dumbbell Sales Up 400%',
            'Man on Swolempic Consumes 8,000 Calories a Day: "I\'m Just Getting Started"',
        ];
        var lastIdx = -1;
        btn.addEventListener('click', function() {
            var idx;
            do { idx = Math.floor(Math.random() * headlines.length); } while (idx === lastIdx && headlines.length > 1);
            lastIdx = idx;
            textEl.textContent = headlines[idx];
            textEl.style.opacity = 0;
            textEl.style.transform = 'translateY(8px)';
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    textEl.style.transition = 'opacity .3s, transform .3s';
                    textEl.style.opacity = 1;
                    textEl.style.transform = 'translateY(0)';
                });
            });
        });
    })();

    // — Wheel of Side Effects —
    (function() {
        var wheel = document.getElementById('wheelEl');
        var spinBtn = document.getElementById('wheelSpinBtn');
        var resultEl = document.getElementById('wheelResult');
        var resultTextEl = document.getElementById('wheelResultText');
        if (!wheel || !spinBtn || !resultEl || !resultTextEl) return;

        var segments = [
            { color: '#e63946', title: 'Doorframe Navigation Difficulty', desc: 'You now enter rooms sideways. Doorways have become a strategic challenge. Your shoulders filed a complaint with building management.' },
            { color: '#2a9d8f', title: 'Spontaneous Pec Flexing', desc: 'Every time you pass a reflective surface, your chest contracts involuntarily. You have been banned from three department stores for intimidating mannequins.' },
            { color: '#e9c46a', title: 'Main Character Energy Overdose', desc: 'You have developed an unshakable belief that you are the protagonist. You tried to explain your "arc" to a barista. She was not impressed.' },
            { color: '#f4a261', title: 'Chronic Tank Top Weather', desc: 'You now feel cold at any temperature below 75F unless you are wearing a tank top. Your collection of sleeveless shirts has tripled.' },
            { color: '#457b9d', title: 'Bicep Vein Satellite Visibility', desc: 'Your bicep veins are now visible from low Earth orbit. NASA has added a new landmark to their maps. They are calling it "the roadmap."' },
            { color: '#1d3557', title: 'Compulsive Gym Selfie Syndrome', desc: 'You cannot complete a workout without documenting every set from at least 4 angles. Your camera roll is 97% shoulder poses and 3% regret.' },
            { color: '#ff6b35', title: 'Uncontrollable Bro-Speak', desc: 'You have started unironically saying "light weight baby." Your vocabulary now consists of 80% gym slang and 20% grunting.' },
            { color: '#6b4ce6', title: 'Permanent Flex Face', desc: 'Your resting face now looks like you are mid-bicep curl. Friends have asked if you are in pain. You are not. You are just huge.' },
        ];
        var segAngle = 360 / segments.length;
        var gradParts = [];
        for (var si = 0; si < segments.length; si++) {
            var from = si * segAngle;
            var to = (si + 1) * segAngle;
            gradParts.push(segments[si].color + ' ' + from + 'deg ' + to + 'deg');
        }
        wheel.style.background = 'conic-gradient(' + gradParts.join(', ') + ')';

        var currentRotation = 0;
        var isSpinning = false;
        var resultInner = resultEl.querySelector('.wheel-result-inner');

        spinBtn.addEventListener('click', function() {
            if (isSpinning) return;
            isSpinning = true;
            resultInner.classList.remove('show');

            var spins = 5 + Math.floor(Math.random() * 4);
            var extra = Math.random() * 360;
            var total = spins * 360 + extra;
            currentRotation += total;

            wheel.style.transition = 'transform 4s cubic-bezier(.17,.67,.12,.99)';
            wheel.style.transform = 'rotate(' + currentRotation + 'deg)';

            var duration = 3800 + Math.random() * 400;
            wheel.style.transitionDuration = duration + 'ms';
        });

        wheel.addEventListener('transitionend', function() {
            if (!isSpinning) return;
            isSpinning = false;

            var norm = ((currentRotation % 360) + 360) % 360;
            var idx = Math.floor(((360 - norm) % 360) / segAngle);
            if (idx >= segments.length) idx = 0;

            var seg = segments[idx];
            resultTextEl.innerHTML = '<span style="color:#ffd700;">' + seg.title + '</span><br><span style="color:#ccc;font-size:14px;font-weight:400;">' + seg.desc + '</span>';
            resultInner.classList.add('show');

            setTimeout(function() {
                resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });
    })();

    // — Blast & Cruise Mode —
    (function() {
        var blastBtn = document.getElementById('modeBlast');
        var cruiseBtn = document.getElementById('modeCruise');
        if (!blastBtn || !cruiseBtn) return;
        var savedMode = localStorage.getItem('swolempicMode');
        function setMode(mode) {
            if (mode === 'cruise') {
                document.body.classList.add('cruise-mode');
                blastBtn.classList.remove('active');
                cruiseBtn.classList.add('active');
            } else {
                document.body.classList.remove('cruise-mode');
                blastBtn.classList.add('active');
                cruiseBtn.classList.remove('active');
            }
            localStorage.setItem('swolempicMode', mode);
        }
        if (savedMode === 'cruise') { setMode('cruise'); }
        else { setMode('blast'); }
        blastBtn.addEventListener('click', function() { setMode('blast'); });
        cruiseBtn.addEventListener('click', function() { setMode('cruise'); });
    })();

    // — Gyno Checker —
    (function() {
        var btn = document.getElementById('gynoBtn');
        var statusEl = document.getElementById('gynoStatus');
        var iconEl = document.getElementById('gynoIcon');
        if (!btn || !statusEl || !iconEl) return;
        var states = ['FLAT', 'SUSPICIOUS', 'PLANNING A MUTINY'];
        btn.addEventListener('click', function() {
            btn.disabled = true;
            statusEl.textContent = 'Scanning...';
            iconEl.className = 'gyno-icon scanning';
            setTimeout(function() {
                var idx = Math.floor(Math.random() * states.length);
                var state = states[idx];
                statusEl.textContent = 'Your nipples are currently: ' + state + '. Please proceed to the nearest mirror and report back.';
                if (state === 'FLAT') { iconEl.textContent = '\u2705'; }
                else if (state === 'SUSPICIOUS') { iconEl.textContent = '\uD83E\uDD28'; }
                else { iconEl.textContent = '\uD83D\uDEA8'; }
                iconEl.className = 'gyno-icon';
                btn.disabled = false;
            }, 1200);
        });
    })();

    // — Pump Meter —
    (function() {
        var slider = document.getElementById('pumpSlider');
        var fill = document.getElementById('pumpGaugeFill');
        var label = document.getElementById('pumpLabel');
        var value = document.getElementById('pumpValue');
        if (!slider || !fill || !label || !value) return;
        var stages = [
            { max: 20, text: 'Not even close' },
            { max: 40, text: 'Getting there' },
            { max: 60, text: 'Looking swole' },
            { max: 80, text: 'Skin is stretching' },
            { max: 100, text: 'You can hear your own heartbeat' }
        ];
        function updatePump() {
            var v = parseInt(slider.value);
            fill.style.height = v + '%';
            value.textContent = v + '%';
            for (var i = 0; i < stages.length; i++) {
                if (v <= stages[i].max) { label.textContent = stages[i].text; break; }
            }
        }
        slider.addEventListener('input', updatePump);
        updatePump();
    })();

    // — Hair Loss Tracker —
    (function() {
        var btn = document.getElementById('hairBtn');
        var tag = document.getElementById('hairTag');
        var msg = document.getElementById('hairMessage');
        var bar = document.getElementById('hairBar');
        var pct = document.getElementById('hairPct');
        if (!btn || !tag || !msg || !bar || !pct) return;
        var hairIdx = 0;
        var statuses = ['REASSURING', 'RECEDING', 'FOREHEAD IS NOW FIVEHEAD'];
        var messages = [
            'Your hair is currently: <strong>ON VACATION</strong>',
            'Your hair is currently: <strong>PACKING ITS BAGS</strong>',
            'Your hair is currently: <strong>NO LONGER EMPLOYED</strong>'
        ];
        var bars = ['\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588', '\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591', '\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591'];
        var pcts = ['100%', '50%', '10%'];
        btn.addEventListener('click', function() {
            hairIdx = (hairIdx + 1) % statuses.length;
            tag.textContent = statuses[hairIdx];
            msg.innerHTML = messages[hairIdx];
            bar.textContent = bars[hairIdx];
            pct.textContent = pcts[hairIdx];
        });
    })();

    // — Liver Status Gauge —
    (function() {
        var btn = document.getElementById('liverBtn');
        var fill = document.getElementById('liverGaugeFill');
        var status = document.getElementById('liverStatus');
        if (!btn || !fill || !status) return;
        var statuses = [
            'Healthy — your liver is confused about why you\'re even testing it',
            'Concerned — your liver has started a group chat about your choices',
            'Party Time — your liver is currently accepting drink tickets',
            'Your Liver Has Left a Complaint — HR has been notified',
            'Elevated — your liver is writing a strongly worded letter',
            'Compromised — your liver has unfriended you on Facebook',
            'Critical — your liver\'s lawyer is drawing up papers',
            'Optimal — somehow, by all accounts, you\'re fine. Don\'t question it.',
        ];
        btn.addEventListener('click', function() {
            var pct = Math.floor(Math.random() * 101);
            fill.style.width = pct + '%';
            var idx = Math.floor(Math.random() * statuses.length);
            status.textContent = 'Current liver status: ' + statuses[idx];
        });
    })();

    // — Stack Configurator —
    (function() {
        var btn = document.getElementById('stackBtn');
        var baseEl = document.getElementById('stackBase');
        var addonEl = document.getElementById('stackAddon');
        var supportEl = document.getElementById('stackSupport');
        var titleEl = document.getElementById('stackResultTitle');
        var detailEl = document.getElementById('stackResultDetail');
        if (!btn || !baseEl || !addonEl || !supportEl || !titleEl || !detailEl) return;
        var baseLabels = ['Testosterone (The Classic)', 'Swolempic Proprietary Blend (The Futuristic)', 'Both (The \'I Like My Liver\' Option)'];
        var addonLabels = ['None (Keeping it clean)', 'Trenbolone (The Chaos Agent)', 'Anadrol (The Nuclear Option)'];
        var supportLabels = ['None (I feel lucky)', 'Aromatase Inhibitor (For my nipples)', 'Liver Support (For my liver, which is filing a complaint)'];
        var stacks = {
            '0_0_0': { name: 'The Puritan', verdict: 'Clean, classic, and almost responsible. Your doctor would still hate it, but slightly less.' },
            '0_0_1': { name: 'The Cautious Optimist', verdict: 'You brought an AI to a test-only party. Smart. Your nipples thank you.' },
            '0_0_2': { name: 'The Responsible Adult', verdict: 'Test + liver support. Someone actually did their research. We\'re proud of you. Disappointed, but proud.' },
            '0_1_0': { name: 'The Weekend Warrior', verdict: 'You will be absolutely unstoppable for 4 weeks, then you will deeply question every decision you\'ve ever made.' },
            '0_1_1': { name: 'The Chemist', verdict: 'Test + Tren + AI. You\'ve done this before. Your organs have started a support group without you.' },
            '0_1_2': { name: 'The Risk Manager', verdict: 'Test + Tren + liver support. You want to be huge AND functional. Pick one.' },
            '0_2_0': { name: 'The Nuclear Option', verdict: 'Test + Anadrol with no support. You like to live dangerously. Your liver is drafting its will.' },
            '0_2_1': { name: 'The Controlled Detonation', verdict: 'Test + Anadrol + AI. You want mass but not tits. A reasonable compromise in an unreasonable world.' },
            '0_2_2': { name: 'The Safety Third', verdict: 'Test + Anadrol + liver support. Safety third, after gains and more gains.' },
            '1_0_0': { name: 'The Futurist', verdict: 'You trust proprietary blends. You probably also invest in crypto. Bold strategy.' },
            '1_0_1': { name: 'The Modern Man', verdict: 'Swolempic blend + AI. You\'re sophisticated. You probably use face moisturizer. No judgment.' },
            '1_0_2': { name: 'The Biohacker', verdict: 'Swolempic blend with liver support. You\'ve read too many podcast show notes.' },
            '1_1_0': { name: 'The Chaos Agent', verdict: 'Swolempic + Tren. You have no regard for human physiology. We respect that.' },
            '1_1_1': { name: 'The Full Send', verdict: 'Swolempic + Tren + AI. You came to play. Your endocrine system is filing a restraining order.' },
            '1_1_2': { name: 'The Contradiction', verdict: 'Swolempic + Tren + liver support. You want to be the baddest dude in the nursing home.' },
            '1_2_0': { name: 'The Daredevil', verdict: 'Swolempic + Anadrol. No AI, no support. You either die huge or live long enough to become the villain.' },
            '1_2_1': { name: 'The Scientist', verdict: 'Swolempic + Anadrol + AI. You\'ve calculated the risks. You just don\'t care.' },
            '1_2_2': { name: 'The Overengineer', verdict: 'Swolempic + Anadrol + liver support. Maximum gains with minimum brain cells lost.' },
            '2_0_0': { name: 'The Overachiever', verdict: 'Two bases and nothing else. You don\'t need support. You need a therapist.' },
            '2_0_1': { name: 'The Prepared', verdict: 'Two bases + AI. Your nipples are safe. The rest of you? Not so much.' },
            '2_0_2': { name: 'The Paradox', verdict: 'Two bases + liver support. You\'re simultaneously destroying and protecting your liver. Schr&ouml;dinger\'s organ.' },
            '2_1_0': { name: 'The Reckless', verdict: 'Both bases + Tren. You\'ve chosen violence. Your blood pressure has chosen to leave your body.' },
            '2_1_1': { name: 'The Unstoppable', verdict: 'Both bases + Tren + AI. You will be absolutely massive. You will also be absolutely insane.' },
            '2_1_2': { name: 'The Contradiction Max', verdict: 'Everything you could find + liver support. It\'s like putting a band-aid on a gunshot wound. We respect the effort.' },
            '2_2_0': { name: 'The Organ Donor', verdict: 'Every compound. No support. Your liver, kidneys, and heart have formed a union and are considering a strike.' },
            '2_2_1': { name: 'The Controlled Burn', verdict: 'Every compound + AI. At least your chest will look good at the funeral.' },
            '2_2_2': { name: 'The Full Monty', verdict: 'All compounds, all support. You\'ve covered every base except common sense.' },
        };
        var resultInner = document.getElementById('stackResult').querySelector('.stack-result-inner');
        btn.addEventListener('click', function() {
            var key = baseEl.value + '_' + addonEl.value + '_' + supportEl.value;
            var stack = stacks[key] || { name: 'The Gambler', verdict: 'This combination is so unique we don\'t have a name for it. Godspeed.' };
            titleEl.textContent = 'YOUR STACK: \'' + stack.name + '\'';
            detailEl.innerHTML = '- Base: ' + baseLabels[parseInt(baseEl.value)] + '<br>- Add-on: ' + addonLabels[parseInt(addonEl.value)] + '<br>- Support: ' + supportLabels[parseInt(supportEl.value)] + '<br><br><strong>Verdict:</strong> ' + stack.verdict;
            resultInner.classList.add('show');
        });
    })();

    // — Natty or Not Quiz —
    (function() {
        var section = document.getElementById('natty-quiz');
        if (!section) return;
        var progress = document.getElementById('nattyProgress');
        var question = document.getElementById('nattyQuestion');
        var options = document.getElementById('nattyOptions');
        var result = document.getElementById('nattyResult');
        var reset = document.getElementById('nattyReset');
        var nattyData = [
            { q: 'How many grams of protein do you eat?', opts: ['100g', '250g', 'I\'ve lost count'], scores: [0, 1, 2] },
            { q: 'How much do you bench?', opts: ['135', '225', 'What\'s a bench?'], scores: [0, 1, 2] },
            { q: 'Do you take supplements?', opts: ['Just creatine', 'Pre-workout, fish oil, BCAAs', 'Define supplements'], scores: [0, 1, 2] },
            { q: 'How many days a week do you train?', opts: ['3', '5', 'Yes'], scores: [0, 1, 2] }
        ];
        var nattyIdx = 0;
        var nattyScore = 0;
        function renderNattyQuestion() {
            if (nattyIdx >= nattyData.length) { showNattyResult(); return; }
            var q = nattyData[nattyIdx];
            question.textContent = q.q;
            options.innerHTML = '';
            for (var i = 0; i < q.opts.length; i++) {
                var btn = document.createElement('button');
                btn.className = 'natty-opt';
                btn.textContent = q.opts[i];
                btn.setAttribute('data-score', q.scores[i]);
                btn.addEventListener('click', function() { handleNattyAnswer(parseInt(this.getAttribute('data-score'))); });
                options.appendChild(btn);
            }
            progress.textContent = 'Question ' + (nattyIdx + 1) + ' of ' + nattyData.length;
            result.textContent = ''; result.className = 'natty-result'; reset.style.display = 'none';
        }
        function handleNattyAnswer(score) {
            nattyScore += score; nattyIdx++;
            var btns = options.querySelectorAll('.natty-opt');
            for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
            setTimeout(renderNattyQuestion, 400);
        }
        function showNattyResult() {
            question.textContent = ''; options.innerHTML = ''; progress.textContent = 'Verdict';
            var verdict, cls;
            if (nattyScore <= 2) { verdict = 'NATTY (ha, sure). Your physique is clearly the result of hard work... and hard work alone. The judges are not convinced.'; cls = 'natty'; }
            else if (nattyScore <= 5) { verdict = 'SUSPICIOUS. You\'re either natty with great genetics or not natty with terrible discipline. The panel is divided.'; cls = 'sus'; }
            else { verdict = 'NOT NATTY. You look like you were assembled in a lab. We respect it.'; cls = 'not'; }
            result.textContent = verdict; result.className = 'natty-result ' + cls;
            reset.style.display = 'inline-block';
        }
        reset.addEventListener('click', function() { nattyIdx = 0; nattyScore = 0; result.className = 'natty-result'; renderNattyQuestion(); });
        renderNattyQuestion();
    })();

    // — PCT Section —
    (function() {
        var btn = document.getElementById('pctBtn');
        if (!btn) return;
        btn.addEventListener('click', function() {
            alert("Your PCT appointment is scheduled for... never. You're already planning your next cycle.");
        });
    })();
})();
