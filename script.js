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

    // News ticker — sliding crawl (CNN style)
    (function() {
        var headlines = [
            'Clinical trial shows S1RA users gain an average of <strong>24 lbs</strong> in 12 weeks',
            'Doctors furious: "This compound works too well," says leading endocrinologist',
            'S1RA stock surges 400% after FDA fast-track designation for <strong>"being absolutely jacked"</strong>',
            'Your gym crush is on S1RA &mdash; here\'s how to tell',
            'Wife\'s boyfriend demands S1RA prescription after seeing your gains',
            'World\'s Largest Shoulders now attainable without squats, says S1RA',
            'Local man hasn\'t skipped leg day in 8 years, community "concerned"'
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

    // Particle burst on footer link click
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
        flMessages['SterōidHub'] = 'Welcome to SterōidHub. Your feed: 47 new posts tagged #NattyOrNot and 12 from BroScience™.';
        flMessages['OnlyGains'] = 'Welcome to OnlyGains. Subscribe for $19.99/mo (vegan tier) or $49.99/mo (unlimited trenbolone content).';
        flMessages['FacePump'] = 'FacePump: The social network where you can only post pump photos. Your last post got 47 flexes and 3 jealous comments.';
        flMessages['SwoleTwitter'] = 'SwoleTwitter — Trending: #ChestDay, #LegDayNeverSkip, #WhereIsMyPreWorkout.';
        flMessages['LinkedOut'] = 'LinkedOut: You have 3 new connection requests from supplement sales reps and 1 from a girl you went to high school with.';
        flMessages['Privacy Policy (we sell your data to supplement companies)'] = 'PRIVACY POLICY: We collect your data, your search history, and your girlfriend. By using S1RA you agree you have no privacy.';
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

    function openModal() {
        modalOpen = true;
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

    // Quiz logic
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
          fb: ['Wrong. Contentment is for people who aren\'t on S1RA.', 'Correct. You\'re already thinking like a champion.'] },
        { q: 'Do you enjoy fitting into normal-sized chairs?', a: 1,
          opts: ['Yes, comfort matters to me', 'No, chairs are for the weak'],
          fb: ['Wrong. Comfort is the enemy of growth. Your lats need their own seat.', 'Correct. Real S1RA users require two chairs.'] },
        { q: 'Are you afraid of looking better than your friends?', a: 1,
          opts: ['Yes, I don\'t want to stand out', 'No, I want them to feel inadequate'],
          fb: ['Wrong. Standing out is the whole point of S1RA.', 'Correct. Their insecurity is your protein.'] }
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

    // Before/After slider
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
        alert('🎉gratulations! You\'ve saved 20% on your first cycle of S1RA. Your starter pack will arrive in 5-7 business days in an unmarked box. Please have your ID ready.');
    });

    bookBtn.addEventListener('click', function() {
        var phone = '(800) 555-S1RA';
        alert('Thanks for your interest! An S1RA specialist will call you at ' + phone + ' within 24-48 hours. (This is a parody. No one is calling.)');
    });

    stayBtn.addEventListener('click', function() {
        hideExitPopup();
        openModal();
    });

    leaveBtn.addEventListener('click', function() {
        hideExitPopup();
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

    // Dose Calculator
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

    // FAQ Accordion
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

    // News Generator
    (function() {
        var btn = document.getElementById('newsGenBtn');
        var textEl = document.getElementById('newsGenText');
        var display = document.getElementById('newsGenDisplay');
        if (!btn || !textEl) return;
        var headlines = [
            'Local Man Gains 40 lbs, Doors Declare War',
            'S1RA Announces "Buy One Cycle, Get a Spare Rib Free" Promotion',
            'Study Finds S1RA Users 3x More Likely to Flex in Public Restrooms',
            'FDA Considering Reclassifying S1RA as a "Performance Enhancing Lifestyle Choice"',
            'Man on S1RA Mistaken for a Small Building; Residents Concerned',
            'Your Ex's New Boyfriend Reportedly "Nervous" About Your S1RA Results',
            'S1RA Named Official Sponsor of "I Don't Skip Leg Day" Championship',
            'Breaking: Bicep Curls Now Considered "Foreplay" by S1RA Users',
            'S1RA Causes Permanent Case of Main Character Energy',
            'Report: 9 out of 10 S1RA Users Can't Stop Talking About S1RA',
            'S1RA Clinic Offers "Size Does Matter" Guarantee — Literally in Writing',
            'S1RA Introduces "Gains Without Pain" Plan: Results May Vary, Pants Will Not Fit',
            'CrossFit Community Shaken as S1RA Users Start Doing Actual Work',
            'Man on S1RA Tries to Buy Shirt, Discovers Clothing Is "Suggestive Sizing"',
            'S1RA Stock Up 400% After CEO Bench Presses 405 at Press Conference',
            'WADA Bans S1RA — Athletes Respond with "Like We Care"',
            'Your Girlfriend's Dad Now Asks You for Spotting Advice',
            'Breaking: S1RA Linked to Increased Tendency to Wear Tank Tops in Winter',
            'Man Saves Thousands a Month by Switching to Free S1RA Program (He Made It Up)',
            'Study Confirms S1RA Users Can Still Taste Food — "A Game Changer," Says Former Patient',
            'Rebound Weight? S1RA Users Ask "What Rebound?" — Gains Reportedly Permanent',
            'S1RA Users Report "Unprecedented" Aggression — Gym Dumbbell Sales Up 400%',
            'Man on S1RA Consumes 8,000 Calories a Day: "I\'m Just Getting Started"',
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

    // Wheel of Side Effects
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
})();
