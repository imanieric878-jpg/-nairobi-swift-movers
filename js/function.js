(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});


	/* Sticky Header */	
	if($('.active-sticky-header').length){
		var topBarHeight = 0;
		var stickyHeaderHeight = 0;

		function updateHeaderHeights() {
			topBarHeight = $('.movein-top-bar').outerHeight() || 0;
			stickyHeaderHeight = $('header .header-sticky').outerHeight() || 0;
			$("header.main-header").css({
				"top": topBarHeight + "px",
				"height": stickyHeaderHeight + "px"
			});
		}

		// Initial and resize/load updates
		updateHeaderHeights();
		$window.on('resize load', function(){
			updateHeaderHeights();
		});
	
		$window.on("scroll", function() {
			var fromTop = $(window).scrollTop();
			// Toggle active class based on cached topBarHeight to avoid DOM thrashing
			$("header .header-sticky").toggleClass("active", (fromTop > topBarHeight));
		});
	}	
	
	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu',
		afterClose: function() {
			// Auto collapse all submenus when the main mobile overlay is closed
			$('.slicknav_nav .slicknav_open').each(function() {
				$(this).removeClass('slicknav_open').addClass('slicknav_collapsed');
				$(this).next('ul').addClass('slicknav_hidden').hide();
			});
		}
	});
	// Disable navigation on parent items inside slicknav so they act as toggles
	$('.slicknav_nav .slicknav_row a').attr('href', 'javascript:void(0);');
	$(window).on('load', function() {
		$('.slicknav_nav .slicknav_row a').attr('href', 'javascript:void(0);');
	});

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});

		// Back to Top button scroll active state
		$window.on("scroll", function() {
			if ($(window).scrollTop() > 300) {
				$("a[href='#top']").addClass("active");
			} else {
				$("a[href='#top']").removeClass("active");
			}
		});
	}

	/* Hero Slider Layout JS */
	const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
		effect: 'fade',
		slidesPerView : 1,
		speed: 1000,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.hero-pagination',
			clickable: true,
		},
	});

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-btn-next',
				prevEl: '.testimonial-btn-prev',
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				991:{
					slidesPerView: 2,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function() {
			$('.skillbar').each(function() {
				$(this).find('.count-bar').animate({
				width:$(this).attr('data-percent')
				},2000);
			});
		},{
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount 	= 0.05,
			translateXValue = 0,
			delayValue 		= 0.5,
		   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
				});
		});		
	}
	
	if ($('.text-anime-style-2').length) {				
		let	 staggerAmount 		= 0.03,
			 translateXValue	= 20,
			 delayValue 		= 0.1,
			 easeType 			= "power2.out",
			 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
		});		
	}
	
	if ($('.text-anime-style-3').length) {		
		let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
		
		 animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element,	start: "top 90%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});		
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
			  return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		// Save contact info to dashboard quotes list
		try {
			const fname = $("#contactForm #fname").val();
			const lname = $("#contactForm #lname").val();
			const email = $("#contactForm #email").val();
			const phone = $("#contactForm #phone").val();
			const message = $("#contactForm #message").val();

			let storageQuotes = [];
			const storedQuotes = localStorage.getItem('nsm_quotes');
			if (storedQuotes) {
				storageQuotes = JSON.parse(storedQuotes);
			}

			const contactTrackingId = 'TPM-' + Math.floor(1000 + Math.random() * 9000) + '-TM';

			const newQuote = {
				id: contactTrackingId,
				customerName: (fname || '') + ' ' + (lname || ''),
				email: email || 'N/A',
				phone: phone || 'N/A',
				dateReceived: new Date().toISOString().split('T')[0],
				moveDate: 'Flexible / Unscheduled',
				pickup: 'Team Inquiry (N/A)',
				delivery: 'Flexible',
				moveType: 'Home Relocation',
				status: 'Pending Quote',
				cost: 0,
				instructions: 'Team inquiry message: "' + (message || '') + '" [Received via Team Member Contact form]'
			};
			storageQuotes.unshift(newQuote);
			localStorage.setItem('nsm_quotes', JSON.stringify(storageQuotes));

			// Save to real database
			fetch('https://formspree.io/f/mqpevyga', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
					body: JSON.stringify({
						formType: 'Moving Quote Request',
						trackingId: newQuote.id,
						customerName: newQuote.customerName,
						phone: newQuote.phone,
						email: newQuote.email,
						moveDate: newQuote.moveDate,
						pickup: newQuote.pickup,
						delivery: newQuote.delivery,
						moveType: newQuote.moveType,
						instructions: newQuote.instructions,
						dateReceived: newQuote.dateReceived
					})
				}).catch(err => console.error('Formspree dispatch failed:', err));
		} catch(err) {
			console.error('Error linking contact form to dashboard', err);
		}

		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Appointment form validation */
	var $requestquoteForm = $("#requestquoteForm");
	$requestquoteForm.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitappointmentForm();
		}
	});

	function submitappointmentForm(){
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-appointment.php",
			data: $requestquoteForm.serialize(),
			success : function(text){
				if (text === "success"){
					appointmentformSuccess();
				} else {
					appointmentsubmitMSG(false,text);
				}
			}
		});
	}

	function appointmentformSuccess(){
		$appointmentForm[0].reset();
		appointmentsubmitMSG(true, "Message Sent Successfully!")
	}

	function appointmentsubmitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-success";
		} else {
			var msgClasses = "h3 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Appointment form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true,
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com/',
						id: 'v=',
						src: '//www.youtube.com/embed/%id%?autoplay=1'
					},
					vimeo: {
						index: 'vimeo.com/',
						id: '/',
						src: '//player.vimeo.com/video/%id%?autoplay=1'
					},
					instagram: {
						index: 'instagram.com',
						id: function(url) {
							var matches = url.match(/(?:p|reel|tv)\/([a-zA-Z0-9-_]+)/);
							if (matches && matches[1]) {
								return matches[1];
							}
							return null;
						},
						src: '//www.instagram.com/p/%id%/embed/'
					}
				}
			}
		});
	}

	/* Service Entry Step Item Active Start */
	var $service_solution_steps = $('.service-solution-steps');
	if ($service_solution_steps.length) {
		var $service_step = $service_solution_steps.find('.service-solution-step-item');

		if ($service_step.length) {
			$service_step.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$service_step.removeClass('active'); 
						$(this).addClass('active'); 
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/*Service Entry Step Item Active End  */
	
	/* Social Reviews Rotator & Premium Tooltips */
	function initReviewsRotator() {
		var $boxes = $('.satisfy-customer-box');
		if (!$boxes.length) return;

		var defaultReviews = [
			{
				"name": "Mercy Wanjiku",
				"city": "Nairobi",
				"rating": 5.0,
				"review": "The packaging was exceptionally neat. They handled my glass display cases with so much care!",
				"avatar": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "David Ochieng",
				"city": "Kisumu",
				"rating": 5.0,
				"review": "Punctual and very efficient! Moved us from Kilimani to Kisumu smoothly without a single scratch.",
				"avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "Amina Hussein",
				"city": "Mombasa",
				"rating": 5.0,
				"review": "Amazing office moving service. They migrated our server racks over the weekend with zero downtime.",
				"avatar": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&h=120&fit=crop&crop=face",
				"platform": "Facebook"
			},
			{
				"name": "Brian Mutua",
				"city": "Nairobi",
				"rating": 5.0,
				"review": "Professional movers indeed. They dismantled and re-assembled all our complex furniture flawlessly.",
				"avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "Sarah Kemunto",
				"city": "Nakuru",
				"rating": 4.9,
				"review": "Affordable rates and super friendly team. Made our shifting experience completely stress-free.",
				"avatar": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&h=120&fit=crop&crop=face",
				"platform": "Trustpilot"
			},
			{
				"name": "John Kiprop",
				"city": "Eldoret",
				"rating": 5.0,
				"review": "The closed truck kept all my household goods dry and clean during the heavy rain. Top recommendation!",
				"avatar": "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "Grace Mwangi",
				"city": "Nairobi",
				"rating": 5.0,
				"review": "Fantastic customer service! The booking process was simple, and the crew was extremely polite.",
				"avatar": "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "Daniel Otieno",
				"city": "Nairobi",
				"rating": 4.8,
				"review": "Highly organized team. The way they wrapped and moved my upright piano was incredibly professional.",
				"avatar": "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=120&h=120&fit=crop&crop=face",
				"platform": "Facebook"
			},
			{
				"name": "Jane Njeri",
				"city": "Mombasa",
				"rating": 5.0,
				"review": "Safe transport and secure storage of our fine art and antique pieces in Mombasa. Excellent service!",
				"avatar": "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "Michael Njoroge",
				"city": "Nairobi",
				"rating": 5.0,
				"review": "Best packers in town! They wrapped everything in bubble wrap and custom crates. Super secure.",
				"avatar": "https://images.unsplash.com/photo-1542156822-6924d1a71aba?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "Fatuma Ali",
				"city": "Nairobi",
				"rating": 5.0,
				"review": "Prompt response to my last-minute emergency move request. They arrived in under 2 hours!",
				"avatar": "https://images.unsplash.com/photo-1590038767624-dac5740a997b?w=120&h=120&fit=crop&crop=face",
				"platform": "Google"
			},
			{
				"name": "Kevin Onyango",
				"city": "Kisumu",
				"rating": 4.9,
				"review": "Very professional crew and great storage facilities. Kept my items safe for 3 months during renovations.",
				"avatar": "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?w=120&h=120&fit=crop&crop=face",
				"platform": "Trustpilot"
			}
		];

		// Try fetching data from JSON first, fallback to defaultReviews
		fetch('data/social-reviews.json')
			.then(function(response) {
				if (!response.ok) throw new Error('Network response was not ok');
				return response.json();
			})
			.then(function(data) {
				if (Array.isArray(data) && data.length >= 3) {
					setupRotator(data);
				} else {
					setupRotator(defaultReviews);
				}
			})
			.catch(function(err) {
				// Fallback to static reviews if CORS or fetch errors occur (e.g. running on file:// protocol)
				setupRotator(defaultReviews);
			});

		function setupRotator(reviews) {
			// Calculate rotation index based on current date (changes every 3 days)
			var daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
			var rotationPeriod = Math.floor(daysSinceEpoch / 3);
			
			// Select 3 reviews using rotationPeriod
			var index1 = (rotationPeriod * 3) % reviews.length;
			var index2 = (rotationPeriod * 3 + 1) % reviews.length;
			var index3 = (rotationPeriod * 3 + 2) % reviews.length;
			
			var selectedReviews = [
				reviews[index1],
				reviews[index2],
				reviews[index3]
			];

			// Process each box on the page
			$boxes.each(function() {
				var $box = $(this);
				
				// 1. Update review text and rating dynamically
				var sumRating = 0;
				selectedReviews.forEach(function(r) { sumRating += r.rating; });
				var avgRating = (sumRating / 3).toFixed(1);
				
				var $content = $box.find('.satisfy-customer-content');
				if ($content.length) {
					$content.html(
						'<h3>Customer Satisfied</h3>' +
						'<p><span class="counter">' + avgRating + '</span> (320+ Verified Reviews)</p>'
					);
					// Re-trigger counter up animation if present
					if ($.fn.counterUp) {
						$content.find('.counter').counterUp({ delay: 6, time: 1000 });
					}
				}

				// 2. Clear and rebuild the avatars to register hover/touch events.
				var $imagesContainer = $box.find('.satisfy-customer-images');
				if ($imagesContainer.length) {
					$imagesContainer.empty();
					
					selectedReviews.forEach(function(review, idx) {
						var $imgDiv = $('<div class="satisfy-customer-image" data-index="' + idx + '">' +
							'<figure class="image-anime reveal animated" style="visibility: visible; opacity: 1; margin: 0; width: 60px; height: 60px; border-radius: 50%; overflow: hidden;">' +
								'<img src="' + review.avatar + '" alt="' + review.name + '" style="transform: scale(1); width: 100%; height: 100%; object-fit: cover; display: block;">' +
							'</figure>' +
						'</div>');
						
						$imagesContainer.append($imgDiv);
					});
				}

				// 3. Create a unique floating tooltip card for this box if it doesn't exist
				var $tooltip = $box.find('.review-tooltip-card');
				if (!$tooltip.length) {
					$tooltip = $('<div class="review-tooltip-card">' +
						'<div class="review-tooltip-header">' +
							'<div class="review-tooltip-user">' +
								'<span class="review-tooltip-name"></span>' +
								'<span class="review-tooltip-location"></span>' +
							'</div>' +
							'<span class="review-tooltip-platform"></span>' +
						'</div>' +
						'<div class="review-tooltip-stars"></div>' +
						'<p class="review-tooltip-text"></p>' +
					'</div>');
					$box.append($tooltip);
				}

				// Function to populate tooltip card with review data
				function populateTooltip(review) {
					$tooltip.find('.review-tooltip-name').text(review.name);
					$tooltip.find('.review-tooltip-location').text(review.city + ', Kenya');
					$tooltip.find('.review-tooltip-text').text('"' + review.review + '"');
					
					// Set platform
					var $platform = $tooltip.find('.review-tooltip-platform');
					$platform.removeClass('google facebook trustpilot');
					$platform.addClass(review.platform.toLowerCase());
					$platform.html('<i class="fab fa-' + review.platform.toLowerCase() + '"></i> ' + review.platform);

					// Render stars
					var $stars = $tooltip.find('.review-tooltip-stars');
					$stars.empty();
					var fullStars = Math.floor(review.rating);
					for (var i = 0; i < 5; i++) {
						if (i < fullStars) {
							$stars.append('<i class="fa-solid fa-star"></i>');
						} else {
							$stars.append('<i class="fa-regular fa-star"></i>');
						}
					}
				}

				// 4. Bind hover and touch interactions
				var hideTimeout;
				$box.on('mouseenter', '.satisfy-customer-image', function() {
					clearTimeout(hideTimeout);
					var $avatar = $(this);
					var index = $avatar.data('index');
					var review = selectedReviews[index];
					
					populateTooltip(review);

					// Calculate arrow center pointer dynamically
					var avatarCenter = $avatar.position().left + ($avatar.outerWidth() / 2);
					$tooltip.css('--arrow-left', avatarCenter + 'px');

					// Position tooltip: center of card aligned with center of avatar, bound inside the box
					var tooltipWidth = $tooltip.outerWidth();
					var leftPos = avatarCenter - (tooltipWidth / 2);
					
					// Boundaries containment
					var maxLeft = $box.outerWidth() - tooltipWidth;
					if (leftPos < 0) leftPos = 0;
					if (leftPos > maxLeft) leftPos = maxLeft;

					$tooltip.css('left', leftPos + 'px');
					$tooltip.addClass('active');
				});

				$box.on('mouseleave', '.satisfy-customer-image', function() {
					hideTimeout = setTimeout(function() {
						$tooltip.removeClass('active');
					}, 150);
				});

				// Support mobile touch toggle
				$box.on('click', '.satisfy-customer-image', function(e) {
					e.stopPropagation();
					var $avatar = $(this);
					var index = $avatar.data('index');
					var review = selectedReviews[index];
					
					if ($tooltip.hasClass('active') && $tooltip.data('active-index') === index) {
						$tooltip.removeClass('active');
					} else {
						populateTooltip(review);
						var avatarCenter = $avatar.position().left + ($avatar.outerWidth() / 2);
						$tooltip.css('--arrow-left', avatarCenter + 'px');
						var tooltipWidth = $tooltip.outerWidth();
						var leftPos = avatarCenter - (tooltipWidth / 2);
						var maxLeft = $box.outerWidth() - tooltipWidth;
						if (leftPos < 0) leftPos = 0;
						if (leftPos > maxLeft) leftPos = maxLeft;

						$tooltip.css('left', leftPos + 'px');
						$tooltip.addClass('active');
						$tooltip.data('active-index', index);
					}
				});
				
				// Hide tooltip when clicking elsewhere
				$(document).on('click', function() {
					$tooltip.removeClass('active');
				});
			});
		}
	}

	// Trigger on load
	initReviewsRotator();

	/* Global Testimonials Slider */
	function initTestimonialsSlider() {
		var track = document.getElementById('tsliderTrack');
		var dotsWrap = document.getElementById('tsliderDots');
		if (!track || !dotsWrap) return;

		var cards = Array.from(track.querySelectorAll('.testimonial-card'));
		var total = cards.length;
		var perPage = 3;   // Will be dynamically updated based on viewport
		var gap = 30;  // Must match CSS gap (px)
		var current = 0;   // Index of leftmost visible card
		var autoTimer = null;
		var INTERVAL = 3800; // ms between auto-advances
		var lastPerPage = perPage;

		function sizeCards() {
			var vpW = track.parentElement.offsetWidth;
			if (vpW < 576) {
				perPage = 1;
			} else if (vpW < 992) {
				perPage = 2;
			} else {
				perPage = 3;
			}
			var cardW = Math.floor((vpW - gap * (perPage - 1)) / perPage);
			cards.forEach(function(c) { c.style.width = cardW + 'px'; });

			if (perPage !== lastPerPage) {
				buildDots();
				lastPerPage = perPage;
			}
		}

		function goTo(idx) {
			current = idx;
			var vpW = track.parentElement.offsetWidth;
			var cardW = Math.floor((vpW - gap * (perPage - 1)) / perPage);
			var shift = current * (cardW + gap);
			track.style.transform = 'translateX(-' + shift + 'px)';
			updateDots();
		}

		function next() {
			if (current >= total - perPage) {
				track.style.transition = 'none';
				goTo(0);
				requestAnimationFrame(function() {
					requestAnimationFrame(function() {
						track.style.transition = 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
					});
				});
			} else {
				goTo(current + 1);
			}
		}

		function buildDots() {
			dotsWrap.innerHTML = '';
			var steps = total - perPage + 1;
			for (var i = 0; i < steps; i++) {
				(function(i) {
					var dot = document.createElement('button');
					dot.className = 'tslider-dot' + (i === current ? ' active' : '');
					dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
					dot.addEventListener('click', function() {
						goTo(i);
						resetTimer();
					});
					dotsWrap.appendChild(dot);
				})(i);
			}
		}

		function updateDots() {
			var dots = dotsWrap.querySelectorAll('.tslider-dot');
			dots.forEach(function(dot, idx) {
				if (idx === current) {
					dot.classList.add('active');
				} else {
					dot.classList.remove('active');
				}
			});
		}

		function startTimer() {
			autoTimer = setInterval(next, INTERVAL);
		}

		function resetTimer() {
			clearInterval(autoTimer);
			startTimer();
		}

		// Initial setup
		sizeCards();
		buildDots();
		startTimer();

		// Handle resize
		window.addEventListener('resize', function() {
			sizeCards();
			goTo(Math.min(current, total - perPage));
		});
	}

	initTestimonialsSlider();

	/* Global Autocomplete for Kenya Locations */
	function initGlobalAutocomplete() {
		// Kenya Locations List Generator (Creates over 4,000 distinct locations in Kenya)
		var kenyaLocations = [];
		
		var countiesData = {
			"Nairobi": [
				"Westlands", "Kilimani", "Kileleshwa", "Lavington", "Karen", "Runda", "Gigiri", "Muthaiga", 
				"Lang'ata", "South B", "South C", "Hurlingham", "Parklands", "Loresho", "Nyari", "Upper Hill", 
				"Spring Valley", "Kyuna", "Peponi", "Kitisuru", "Rosslyn", "Brookside", "Muthaiga North", 
				"Ngara", "Pangani", "Highridge", "State House", "Garden Estate", "Ridgeways", "Roysambu", 
				"Kasarani", "Donholm", "Embakasi", "Utawala", "Eastleigh", "Thome", "Zimmerman", "Githurai", 
				"Imara Daima", "Nyayo Estate", "Fedha", "Tassia", "Pipeline", "Clay City", "Mirema", 
				"Gumba Estate", "Safari Park", "Jacaranda", "Woodley", "Jamhuri", "Adams Arcade", "Riara", 
				"Tena", "Buruburu", "Pioneer", "Ngei", "Mugoya", "Akiba", "Phenom", "Nyayo Highrise", 
				"Hazina", "Plainsview", "Balozi", "Lower Kabete", "Dagoretti", "Kawangware", "Kibera", 
				"Madaraka", "Kariokor", "Congo Stage", "Githurai 44", "Githurai 44", "Githurai 45", "Marurui", "Kiamaiko",
				"Mathare", "Dandora", "Umoja", "Kayole", "Kariobangi", "Saika", "Kamulu", "Joska", "Mwiki"
			],
			"Kiambu": [
				"Ruaka", "Kiambu Town", "Ruiru", "Thika", "Kikuyu", "Limuru", "Kahawa Sukari", "Kahawa Wendani", 
				"Wangige", "Kinoo", "Uthiru", "Regen", "Muguga", "Mwimuto", "Kamakis", "Mwihoko", "Juja", 
				"Kiambu Road", "Kirigiti", "Edenville", "Migaa", "Tatu City", "Banana", "Karuri", "Muchatha", 
				"Sigona", "Zambezi", "Tigoni", "Ndumberi", "Riabai", "Githunguri", "Gatundu", "Kimbo", 
				"Thindigua", "Fourways Junction", "Witeithie", "Ndeiya", "Rironi", "Kabiria", "Gachie"
			],
			"Mombasa": [
				"Nyali", "Bamburi", "Tudor", "Kisauni", "Likoni", "Changamwe", "Mikindani", "Mkomani", 
				"Kongowea", "Shanzu", "Kiembeni", "Ganjoni", "Kibokoni", "Majengo", "Makupa", "Mbaraki", 
				"Tononoka", "Digo Road", "Jomvu", "Miritini", "Magongo", "Mokowe", "Bombolulu", "Viwandani"
			],
			"Machakos": [
				"Syokimau", "Athi River", "Mlolongo", "Machakos Town", "Kathiani", "Kangundo", "Tala", 
				"Matuu", "Chumvi", "Katani", "Joska", "Kamulu", "Mavoko"
			],
			"Kajiado": [
				"Kitengela", "Rongai", "Ngong", "Kiserian", "Matasia", "Kajiado Town", "Loitokitok", 
				"Namanga", "Ngong Hills", "Bulbul", "Olekasasi", "Rimpa", "Tuala", "Olooloitikoshi"
			],
			"Kilifi": [
				"Mtwapa", "Vipingo", "Kanamai", "Watamu", "Malindi", "Kilifi Town", "Mariakani", "Kaloleni", "Gede"
			],
			"Kwale": [
				"Diani", "Ukunda", "Tiwi", "Kwale Town", "Msambweni", "Lunga Lunga", "Kinango"
			]
		};

		var otherTowns = [
			"Kisumu", "Nakuru", "Eldoret", "Naivasha", "Nanyuki", "Nyeri", "Meru", "Embu",
			"Kakamega", "Kisii", "Kericho", "Kitale", "Voi", "Chuka", "Kerugoya", "Karatina", 
			"Othaya", "Nyahururu", "Gilgil", "Molo", "Njoro", "Narok", "Bomet", "Sotik", 
			"Kapsabet", "Iten", "Kabarnet", "Bungoma", "Webuye", "Busia", "Mumias", "Vihiga", 
			"Siaya", "Homa Bay", "Migori", "Nyamira", "Garissa", "Wajir", "Mandera", "Lodwar", 
			"Marsabit", "Isiolo", "Kapenguria", "Maralal", "Wundanyi", "Lamu", "Mwea", "Murang'a"
		];

		// Populate counties locations
		for (var county in countiesData) {
			var places = countiesData[county];
			places.forEach(function(place) {
				kenyaLocations.push(place + ", " + county);
				kenyaLocations.push(place + " Phase 1, " + county);
				kenyaLocations.push(place + " Phase 2, " + county);
				kenyaLocations.push(place + " Phase 3, " + county);
				kenyaLocations.push(place + " Court A, " + county);
				kenyaLocations.push(place + " Court B, " + county);
				kenyaLocations.push(place + " Court C, " + county);
				kenyaLocations.push(place + " Gardens, " + county);
				kenyaLocations.push(place + " Heights, " + county);
				kenyaLocations.push(place + " Villas, " + county);
				kenyaLocations.push(place + " Ridge, " + county);
				kenyaLocations.push(place + " Estate, " + county);
				kenyaLocations.push(place + " Road, " + county);
				kenyaLocations.push(place + " Drive, " + county);
				kenyaLocations.push(place + " Lane, " + county);
				kenyaLocations.push(place + " Avenue, " + county);
				kenyaLocations.push(place + " Crescent, " + county);
				kenyaLocations.push(place + " Stage, " + county);
				kenyaLocations.push(place + " Junction, " + county);
			});
		}

		// Populate other major towns in Kenya
		otherTowns.forEach(function(town) {
			kenyaLocations.push(town);
			kenyaLocations.push(town + " Town Center");
			kenyaLocations.push(town + " Milimani Area");
			kenyaLocations.push(town + " Suburbs");
			kenyaLocations.push(town + " Highway Section");
			kenyaLocations.push(town + " Industrial Area");
			kenyaLocations.push(town + " CBD");
			kenyaLocations.push(town + " West");
			kenyaLocations.push(town + " East");
			kenyaLocations.push(town + " South");
			kenyaLocations.push(town + " North");
		});

		// Add Thika Road Exits
		for (var i = 1; i <= 25; i++) {
			kenyaLocations.push("Thika Road Exit " + i + ", Nairobi/Kiambu");
		}
		
		// Add Bypass locations
		var bypasses = ["Northern Bypass", "Southern Bypass", "Eastern Bypass", "Western Bypass"];
		bypasses.forEach(function(bypass) {
			kenyaLocations.push(bypass + " Stage");
			kenyaLocations.push(bypass + " Junction");
			for (var j = 1; j <= 8; j++) {
				kenyaLocations.push(bypass + " Section " + j);
			}
		});

		// Autocomplete helper function with event delegation
		function bindAutocomplete(inputSelector) {
			$(document).on('input focus', inputSelector, function() {
				var $input = $(this);
				var $suggestions = $input.siblings('.custom-autocomplete-suggestions');
				if (!$suggestions.length) {
					$suggestions = $input.parent().find('.custom-autocomplete-suggestions');
				}
				if (!$suggestions.length) return;

				var val = $input.val().trim().toLowerCase();
				$suggestions.empty();

				if (val.length === 0) {
					$suggestions.hide();
					return;
				}

				var matches = kenyaLocations.filter(function(loc) {
					return loc.toLowerCase().indexOf(val) > -1;
				});

				if (matches.length > 0) {
					var limitedMatches = matches.slice(0, 15);
					limitedMatches.forEach(function(match) {
						var $item = $('<div class="suggestion-item"><i class="fas fa-map-marker-alt"></i>' + match + '</div>');
						$item.on('click', function() {
							$input.val(match);
							$suggestions.hide();
						});
						$suggestions.append($item);
					});
					$suggestions.show();
				} else {
					$suggestions.hide();
				}
			});
		}

		// Bind inputs globally
		bindAutocomplete('input[name="moving_from"]');
		bindAutocomplete('input[name="moving_to"]');
		bindAutocomplete('#qmFrom');
		bindAutocomplete('#qmTo');

		// Hide dropdowns when clicking outside
		$(document).on('click', function(e) {
			if (!$(e.target).closest('input[name="moving_from"], input[name="moving_to"], #qmFrom, #qmTo, .custom-autocomplete-suggestions').length) {
				$('.custom-autocomplete-suggestions').hide();
			}
		});
	}

	/* Dynamic Page Header overrides based on URL parameter */
	function handleDynamicPageHeaders() {
		var urlParams = new URLSearchParams(window.location.search);
		var serviceSlug = urlParams.get('service');
		var storageSlug = urlParams.get('storage');

		var servicesData = {
			'local-residential-moves': {
				title: 'Local Residential Moves',
				statement: 'Stress-free house shifting services within Nairobi and surrounding counties, tailored to your family needs.',
				breadcrumb: 'Local Residential Moves'
			},
			'office-commercial': {
				title: 'Office & Commercial Relocations',
				statement: 'Minimize business downtime with our highly coordinated, professional office moving and packing services.',
				breadcrumb: 'Office & Commercial Moves'
			},
			'small-moves': {
				title: 'Small Moves & Single Items',
				statement: 'Affordable and reliable transport for single large items, student gear, or micro-apartments.',
				breadcrumb: 'Small Moves'
			},
			'apartment-moves': {
				title: 'Apartment & Estate Moves',
				statement: 'Specialized shifting solutions for apartments, high-rises, and gated estates with tight stairwells or service elevators.',
				breadcrumb: 'Apartment Moves'
			},
			'long-distance-moves': {
				title: 'Long Distance Shifting',
				statement: 'Secure inter-county relocations from Nairobi to Kisumu, Mombasa, Nakuru, Eldoret, and across Kenya.',
				breadcrumb: 'Long Distance Moves'
			},
			'last-minute-moves': {
				title: 'Last Minute & Emergency Moves',
				statement: 'Need to shift quickly? Call our fast-response emergency relocation crew for same-day packing and moving.',
				breadcrumb: 'Last Minute Moves'
			},
			'hourly-rate-moves': {
				title: 'Hourly Rate Moving Services',
				statement: 'Pay only for the time you use. Flexible hourly rate packages for quick local transfers.',
				breadcrumb: 'Hourly Rate Moves'
			},
			'student-relocations': {
				title: 'Student Relocation Packages',
				statement: 'Budget-friendly moving packages designed specifically for college and university students shifting hostels or bedsitters.',
				breadcrumb: 'Student Relocations'
			},
			'full-packing': {
				title: 'Full Packing Services',
				statement: 'Let our expert packers safely bubble-wrap and pack all your items into boxes, stress-free.',
				breadcrumb: 'Full Packing'
			},
			'white-glove': {
				title: 'White Glove Moving',
				statement: 'Premium, high-end moving service with meticulous wrapping, unpacking, and setup for luxury homes.',
				breadcrumb: 'White Glove Moving'
			},
			'furniture-assembly': {
				title: 'Furniture Assembly & Dismantling',
				statement: 'Professional disassembly and assembly of beds, wardrobes, dining tables, and complex office desks.',
				breadcrumb: 'Furniture Assembly'
			},
			'box-delivery': {
				title: 'Box & Packing Supplies Delivery',
				statement: 'Order high-quality moving boxes, bubble wrap, stretch film, and packing tape delivered to your door.',
				breadcrumb: 'Packing Supplies'
			},
			'piano-heavy': {
				title: 'Piano & Heavy Item Moving',
				statement: 'Specialized equipment and experienced handlers to move pianos, heavy safes, and oversized items safely.',
				breadcrumb: 'Piano & Heavy Moves'
			},
			'gym-equipment': {
				title: 'Gym & Fitness Equipment Moves',
				statement: 'Careful relocation of treadmills, weights, home gyms, and heavy fitness machines with proper disassembly.',
				breadcrumb: 'Gym Moves'
			},
			'bin-rental': {
				title: 'Eco-Friendly Plastic Bin Rental',
				statement: 'Rent clean, reusable, heavy-duty plastic moving boxes. We drop them off and pick them up when done.',
				breadcrumb: 'Plastic Bin Rental'
			},
			'coi-support': {
				title: 'Building COI & Property Support',
				statement: 'Need a Certificate of Insurance (COI) for your building management? We provide full documentation support.',
				breadcrumb: 'COI Support'
			}
		};

		var storageData = {
			'short-term': {
				title: 'Short Term Storage Solutions',
				statement: 'Flexible, week-to-week storage options for transit gaps, renovations, or temporary relocation needs.',
				breadcrumb: 'Short Term Storage'
			},
			'long-term': {
				title: 'Long Term Safe Storage',
				statement: 'Secure, clean, and cost-effective long-term warehousing for households and companies storing items for months or years.',
				breadcrumb: 'Long Term Storage'
			},
			'self-storage': {
				title: 'Self Storage Units',
				statement: 'Private, clean, and easily accessible self-storage lockers to declutter your home or keep personal items safe.',
				breadcrumb: 'Self Storage'
			},
			'commercial': {
				title: 'Commercial & Document Warehousing',
				statement: 'Secure commercial storage for company assets, inventory, office furniture, and archived file records.',
				breadcrumb: 'Commercial Storage'
			},
			'climate-controlled': {
				title: 'Climate Controlled Storage',
				statement: 'Temperature and humidity-regulated spaces to safeguard sensitive goods, electronics, art, and delicate antiques.',
				breadcrumb: 'Climate Controlled'
			},
			'mobile-pods': {
				title: 'Mobile Storage Pods',
				statement: 'We deliver a storage pod to your doorstep. You pack it, we store it in our secure facility. Ultimate convenience.',
				breadcrumb: 'Mobile Storage Pods'
			}
		};

		var data = null;
		if (serviceSlug && servicesData[serviceSlug]) {
			data = servicesData[serviceSlug];
		} else if (storageSlug && storageData[storageSlug]) {
			data = storageData[storageSlug];
		}

		if (data) {
			// Update H1 title
			var $h1 = $('.page-header h1');
			if ($h1.length) {
				$h1.html(data.title);
			}

			// Update description statement
			var $desc = $('.page-header .header-sentence-title');
			if ($desc.length) {
				$desc.text(data.statement);
			}

			// Update active breadcrumb item and trail dynamically
			var $breadcrumbList = $('.page-header .breadcrumb');
			if ($breadcrumbList.length) {
				var breadcrumbHtml = '';
				if (serviceSlug) {
					breadcrumbHtml += `<li class="breadcrumb-item"><a href="services.html" style="color: rgba(255,255,255,0.7); font-size: 14px;">Moving</a></li>`;
				} else if (storageSlug) {
					breadcrumbHtml += `<li class="breadcrumb-item"><a href="service-single.html" style="color: rgba(255,255,255,0.7); font-size: 14px;">Storage</a></li>`;
				}
				breadcrumbHtml += `<li class="breadcrumb-item active" aria-current="page" style="color: #ffffff; font-size: 14px;">${data.breadcrumb}</li>`;
				$breadcrumbList.html(breadcrumbHtml);
			}

			// Update document title
			document.title = data.title + ' - NairobiSwift Movers';
		}

		// --- Dynamic Highlights Section Customizer ---
		var servicesHighlights = {
			'local-residential-moves': {
				title: 'Make your home move smooth & <span>stress-free</span>',
				desc: 'Our professional local moving crew handles everything from packing delicate kitchenware to reassembling your beds, ensuring a seamless transition to your new home.',
				image: 'images/moving_section_photo.png',
				cta: 'GET A HOME MOVING QUOTE',
				checklist: [
					{ bold: 'Vetted Professional Crew:', text: 'Fully trained, polite, and background-checked movers.' },
					{ bold: 'Furniture Protection:', text: 'Thick blankets and stretch wrap for all wood and upholstered items.' },
					{ bold: 'Perfect Placement:', text: 'We place every box and assemble furniture in your rooms of choice.' }
				]
			},
			'office-commercial': {
				title: 'Efficient & organized <span>office relocations</span>',
				desc: 'Minimize business downtime. We work after hours and weekends to dismantle, pack, relocate, and reassemble your workstations, servers, and files.',
				image: 'images/moving_section_photo.png',
				cta: 'GET AN OFFICE QUOTE',
				checklist: [
					{ bold: 'Flexible Scheduling:', text: 'Relocate after hours or over weekends to maintain client services.' },
					{ bold: 'IT & Equipment Protection:', text: 'Specialized packaging and secure transit for servers, screens, and racks.' },
					{ bold: 'Workstation Organization:', text: 'Color-coded labeling system to ensure everything lands at the correct desk.' }
				]
			},
			'small-moves': {
				title: 'Affordable, quick solutions for <span>small moves</span>',
				desc: 'Shifting a bedsitter, single room, or just a few large furniture pieces? Get our budget-friendly micro-moving service without paying for space you do not need.',
				image: 'images/moving_section_photo.png',
				cta: 'GET A SMALL MOVE QUOTE',
				checklist: [
					{ bold: 'Tailored Vehicle Sizes:', text: 'Compact trucks fit for narrow gates and cost-effective transport.' },
					{ bold: 'Express Single-item Deliveries:', text: 'Safe transit for single large items like refrigerators, pianos, or safes.' },
					{ bold: 'Budget-friendly Packing:', text: 'Flexible packing helper options to keep cost within your range.' }
				]
			},
			'apartment-moves': {
				title: 'Specialized shifting for <span>apartments & flats</span>',
				desc: 'Multi-story buildings with stairs or elevators require special care. Our crew excels in navigating narrow corridors and tight stairwells without damage.',
				image: 'images/moving_section_photo.png',
				cta: 'GET AN APARTMENT QUOTE',
				checklist: [
					{ bold: 'Elevator & Corridor Guards:', text: 'Protection covers for elevators and walls to prevent property damage.' },
					{ bold: 'High-floor balcony hoisting:', text: 'Heavy ropes and rigging setup to safely hoist large couches and wardrobes.' },
					{ bold: 'Estate compliance support:', text: 'We coordinate with estate management and security for ease of access.' }
				]
			},
			'long-distance-moves': {
				title: 'Safe inter-county <span>long distance shifting</span>',
				desc: 'Relocating from Nairobi to Mombasa, Kisumu, Nakuru, Eldoret, or any part of Kenya? Our secure long-distance service is fully insured.',
				image: 'images/moving_section_photo.png',
				cta: 'GET A LONG DISTANCE QUOTE',
				checklist: [
					{ bold: 'Real-time GPS Tracking:', text: 'Monitor your relocation truck in real-time throughout its highway transit.' },
					{ bold: 'Goods-in-Transit Protection:', text: 'Comprehensive transit protection covering accidental loss or damage.' },
					{ bold: 'Dual-crew coordination:', text: 'Relocations managed by local loading and delivery crews for efficiency.' }
				]
			},
			'last-minute-moves': {
				title: 'Rapid response for <span>last-minute moves</span>',
				desc: 'Got an urgent request? We offer quick-booking slots and express dispatch moving teams to handle your shifting on the same day.',
				image: 'images/moving_section_photo.png',
				cta: 'GET EMERGENCY ESTIMATE',
				checklist: [
					{ bold: 'Same-day Crew Dispatch:', text: 'Relocation team arrives on short notice fully equipped with boxes.' },
					{ bold: 'Full Packing Support:', text: 'We wrap and box your home contents immediately to save time.' },
					{ bold: 'Reliable execution:', text: 'Same high standards of safety and professionalism under tight deadlines.' }
				]
			},
			'hourly-rate-moves': {
				title: 'Pay only for what you use with <span>hourly rates</span>',
				desc: 'Perfect for quick relocations or inside-building shifting. Avoid flat-rate contracts and pay dynamically for time and manpower.',
				image: 'images/moving_section_photo.png',
				cta: 'BOOK BY THE HOUR',
				checklist: [
					{ bold: 'Flexible Rate Packaging:', text: 'Select helper numbers and truck capacities to fit your target cost.' },
					{ bold: 'No hidden surcharges:', text: 'Transparent time logging and absolute clarity on when the clock runs.' },
					{ bold: 'Efficient operations:', text: 'Movers working swiftly to complete your job within your budget goal.' }
				]
			},
			'student-relocations': {
				title: 'Budget packages for <span>student relocations</span>',
				desc: 'Moving between hostels, university campuses, or bedsitters? We provide student-friendly discounts and fast transport options.',
				image: 'images/moving_section_photo.png',
				cta: 'GET STUDENT DISCOUNT',
				checklist: [
					{ bold: 'Student-friendly Pricing:', text: 'Highly subsidized local packages for bedsitters and small student rooms.' },
					{ bold: 'Compact Shifting Options:', text: 'Quick pickup van hire with or without loading assistance.' },
					{ bold: 'Campus-wide Coverage:', text: 'Serving all major public and private universities across Nairobi and Kiambu.' }
				]
			},
			'full-packing': {
				title: 'Stress-free, premium <span>full packing services</span>',
				desc: 'Do not spend days packing boxes! Our packing specialists safely wrap your kitchen dishes, wardrobe items, art pieces, and books.',
				image: 'images/moving_section_photo.png',
				cta: 'GET A PACKING QUOTE',
				checklist: [
					{ bold: 'Premium Materials Supplied:', text: 'Double-walled custom boxes, bubble wrap, stretch film, and packing tape.' },
					{ bold: 'Organized Box Labeling:', text: 'Detailed labeling of each box by room to ensure easy unpacking.' },
					{ bold: 'Fragile Isolation Care:', text: 'Special wrapping techniques for delicate glass, ceramics, and electronics.' }
				]
			},
			'white-glove': {
				title: 'Luxurious, meticulous <span>white glove moving</span>',
				desc: 'For high-value homes, luxury estates, and premium properties. Experience absolute care with custom crating and full setup.',
				image: 'images/moving_section_photo.png',
				cta: 'GET WHITE GLOVE QUOTE',
				checklist: [
					{ bold: 'Meticulous Protection:', text: 'Floor runner protection, door jamb guards, and custom crates for art.' },
					{ bold: 'Full Unpacking & Styling:', text: 'We unpack boxes, set up closets, mount TVs, and hang pictures.' },
					{ bold: 'Discreet and Vetted:', text: 'Top-tier senior coordinators oversee every stage of the relocation.' }
				]
			},
			'furniture-assembly': {
				title: 'Professional <span>furniture assembly & care</span>',
				desc: 'Beds, executive office desks, wall units, and wardrobes. We safely dismantle at origin and assemble at destination.',
				image: 'images/moving_section_photo.png',
				cta: 'GET ASSEMBLY QUOTE',
				checklist: [
					{ bold: 'Expert Handymen:', text: 'Movers equipped with power drills, hex keys, and custom toolkits.' },
					{ bold: 'Safe Wall Mounting:', text: 'Professional mounting of TV screens, paintings, shelves, and boards.' },
					{ bold: 'Loose Joint Reinforcement:', text: 'We tighten screws and check alignments to make your furniture steady.' }
				]
			},
			'box-delivery': {
				title: 'Fast delivery of <span>boxes & packing supplies</span>',
				desc: 'Need high-quality boxes and wrapping supplies before you move? We deliver durable moving boxes and stretch wrap directly to you.',
				image: 'images/moving_section_photo.png',
				cta: 'ORDER MOVING SUPPLIES',
				checklist: [
					{ bold: 'Heavy-Duty Materials:', text: 'Double-walled custom boxes designed for moving and stacking.' },
					{ bold: 'Same-day Drop-off:', text: 'Express delivery across Nairobi so you can start organizing early.' },
					{ bold: 'Flexible Bundles:', text: 'Starter packs containing tape, markers, bubble wrap, and boxes.' }
				]
			},
			'piano-heavy': {
				title: 'Specialized <span>piano & heavy item moving</span>',
				desc: 'Upright pianos, grand pianos, industrial safes, server racks, and gym units. We have the lifting gear to move them safely.',
				image: 'images/moving_section_photo.png',
				cta: 'GET HEAVY LIFT QUOTE',
				checklist: [
					{ bold: 'Heavy Lifting Equipment:', text: 'Heavy-duty dollies, lifting straps, hoists, and tail-lifts.' },
					{ bold: 'Piano Tuning Safety:', text: 'Careful handling to prevent structural stress and maintain acoustic shape.' },
					{ bold: 'Highly Experienced Crew:', text: 'Trained movers specialized in transporting heavy weight centers.' }
				]
			},
			'gym-equipment': {
				title: 'Secure transport for <span>gym & fitness gear</span>',
				desc: 'Treadmills, weight benches, rowing machines, and dumbbells. We handle disassembly, transport, and setup in your home gym.',
				image: 'images/moving_section_photo.png',
				cta: 'GET GYM RELOCATION QUOTE',
				checklist: [
					{ bold: 'Proper Disassembly:', text: 'Treadmills folded and cables disconnected carefully by handymen.' },
					{ bold: 'Heavy Loading Systems:', text: 'Safe distribution of heavy cast iron weights to protect vehicles.' },
					{ bold: 'Gym Setup at Destination:', text: 'Reassembly and level testing to ensure fitness gear is ready to use.' }
				]
			},
			'bin-rental': {
				title: 'Eco-friendly <span>plastic bin rentals</span>',
				desc: 'Choose sustainable shifting. Rent clean, heavy-duty, stackable plastic moving boxes. We drop them off and collect when unpacked.',
				image: 'images/moving_section_photo.png',
				cta: 'RENT PLASTIC BINS',
				checklist: [
					{ bold: 'Ultra-durable Protection:', text: 'Hard-shell plastic boxes prevent crushing or water damage.' },
					{ bold: 'Sustainable Shifting:', text: 'Reduce cardboard waste with 100% reusable plastic moving bins.' },
					{ bold: 'Convenient Pickups:', text: 'Keep them for up to two weeks, then we pick them up from your new home.' }
				]
			},
			'coi-support': {
				title: 'Full building <span>COI & insurance support</span>',
				desc: 'Many high-end office buildings and residential estates require a Certificate of Insurance (COI) to move. We handle the paperwork.',
				image: 'images/moving_section_photo.png',
				cta: 'REQUEST COI SUPPORT',
				checklist: [
					{ bold: 'Building COI Issuance:', text: 'Prompt delivery of required insurance documents matching building rules.' },
					{ bold: 'Comprehensive Liabilities:', text: 'Covering public liability and workplace injuries inside buildings.' },
					{ bold: 'Management Liaison:', text: 'We align directly with facility managers to ensure smooth entry permissions.' }
				]
			}
		};

		var storageHighlights = {
			'short-term': {
				title: 'Flexible, secure <span>short-term storage</span>',
				desc: 'In transition between homes? Performing quick renovations? Store your household goods securely for a week, a month, or more.',
				image: 'images/storage_section_photo.png',
				cta: 'GET A STORAGE QUOTE',
				checklist: [
					{ bold: 'Flexible weekly billing:', text: 'Pay only for the weeks you use, with no long-term lease rules.' },
					{ bold: 'Doorstep collection:', text: 'We pick up from your home, store it, and deliver back when you are ready.' },
					{ bold: 'Moisture-controlled safety:', text: 'Clean storage units keeping your belongings dry and dust-free.' }
				]
			},
			'long-term': {
				title: 'Cost-effective <span>long-term safe storage</span>',
				desc: 'Traveling abroad or looking to clear up space? We provide discounted, long-term secure warehousing for home and office assets.',
				image: 'images/storage_section_photo.png',
				cta: 'GET LONG TERM QUOTE',
				checklist: [
					{ bold: 'Discounted Long-term Rates:', text: 'Substantial cost savings for storage periods exceeding 6 months.' },
					{ bold: 'Comprehensive Inventory Log:', text: 'Every box and item is cataloged and barcode-tracked for order.' },
					{ bold: 'Dust & Pest Controls:', text: 'Regular fumigation and clean maintenance to safeguard fabrics.' }
				]
			},
			'self-storage': {
				title: 'Private & convenient <span>self storage units</span>',
				desc: 'Need a locked space of your own? Rent self-storage lockers of varying sizes for easy storage of personal items or office stock.',
				image: 'images/storage_section_photo.png',
				cta: 'GET SELF STORAGE QUOTE',
				checklist: [
					{ bold: 'Varying Room Sizes:', text: 'From small lockers to large rooms matching your items.' },
					{ bold: 'High Security Safeguards:', text: 'Continuous monitoring and personal lock controls for privacy.' },
					{ bold: 'Easily Accessible Locations:', text: 'Convenient facility location to retrieve your goods when needed.' }
				]
			},
			'commercial': {
				title: 'Secure <span>commercial & document storage</span>',
				desc: 'Store archived documents, excess office furniture, exhibition material, or retail inventory in our monitored warehouse.',
				image: 'images/storage_section_photo.png',
				cta: 'GET COMMERCIAL STORAGE QUOTE',
				checklist: [
					{ bold: 'Archived Document Storage:', text: 'Climate-controlled file storage with indexing and quick retrievals.' },
					{ bold: 'Office Furniture Reserve:', text: 'Declutter your workspace by storing extra desks and chairs.' },
					{ bold: 'Inventory Logistics Support:', text: 'Receiving and dispatch support for business stock.' }
				]
			},
			'climate-controlled': {
				title: 'Advanced <span>climate controlled storage</span>',
				desc: 'Delicate paintings, wood carvings, leather sofas, electronics, and papers require precise temperature and humidity controls.',
				image: 'images/storage_section_photo.png',
				cta: 'GET CLIMATE CONTROL QUOTE',
				checklist: [
					{ bold: 'Humidity & Temperature Guards:', text: 'Advanced HVAC units maintaining safe atmosphere levels.' },
					{ bold: 'No wood cracking or mold:', text: 'Keep expensive leather, art, and solid wood items pristine.' },
					{ bold: 'Dust-free enclosed units:', text: 'Sealed storage spaces preventing dust buildup during long terms.' }
				]
			},
			'mobile-pods': {
				title: 'Convenient <span>mobile storage pods</span>',
				desc: 'We deliver a storage pod to your driveway or compound. You pack it, we collect and store it in our secure facility.',
				image: 'images/storage_section_photo.png',
				cta: 'GET MOBILE POD QUOTE',
				checklist: [
					{ bold: 'Zero double handling:', text: 'Items stay inside the pod from pickup until final delivery.' },
					{ bold: 'Pack at your own pace:', text: 'Keep the pod at your site to load when it fits your schedule.' },
					{ bold: 'Secure steel structures:', text: 'Weatherproof, locking storage containers built to withstand transit.' }
				]
			}
		};

		var staticHighlights = {
			'about.html': {
				title: 'Learn more about our <span>relocation journey</span>',
				desc: 'Since our inception, NairobiSwift Movers has been redefining the standards of moving and packing across Nairobi with a committed team and state-of-the-art closed trucks.',
				image: 'images/about-image.jpg',
				cta: 'GET A FREE QUOTE',
				checklist: [
					{ bold: 'Vetted Professionals:', text: 'Every crew member is trained in handling fragile assets and furniture dismantling.' },
					{ bold: 'Reliable Fleet:', text: 'All-weather secure, closed trucks monitored continuously for transit safety.' },
					{ bold: 'Guaranteed Satisfaction:', text: 'Customer-centric approach with 24/7 dedicated moving coordinators.' }
				]
			},
			'fleet.html': {
				title: 'Our modern, secure <span>transit fleet</span>',
				desc: 'All our moves are serviced by enclosed, weatherproof closed trucks. We do not use open pickups or open lorries to ensure 100% security and privacy for your goods.',
				image: 'images/lorry-use.png',
				cta: 'BOOK A CLOSED TRUCK',
				checklist: [
					{ bold: 'Weatherproof Enclosures:', text: 'Heavy duty roofs and walls preventing rainwater or dust from entering.' },
					{ bold: 'GPS Cargo Tracking:', text: 'Monitor the position of your truck and cargo in real time.' },
					{ bold: 'Custom Interior Padding:', text: 'Thick padded linings inside trucks to prevent scratching or denting.' }
				]
			},
			'licenses-safety.html': {
				title: 'Fully insured and licensed <span>moving agency</span>',
				desc: 'We carry robust goods in transit (GIT) insurance and third-party liability to cover every single asset during loading, transit, and unloading.',
				image: 'images/about-image2.jpg',
				cta: 'GET INSURED MOVE QUOTE',
				checklist: [
					{ bold: 'Transit Insurance Cover:', text: 'Comprehensive coverage to guarantee compensation for any unexpected incident.' },
					{ bold: 'Compliance & Licenses:', text: 'Operating with official city council permits and NTSA transport compliance.' },
					{ bold: 'Vetted & Checked Crews:', text: 'Rigorous security background checks on all packing and moving staff.' }
				]
			},
			'faqs.html': {
				title: 'Got questions? We have the <span>answers</span>',
				desc: 'Here is everything you need to know about our packing materials, booking procedures, insurance coverage, and moving day coordination.',
				image: 'images/faq-image.jpg',
				cta: 'TALK TO OUR EXPERTS',
				checklist: [
					{ bold: 'No Hidden Costs:', text: 'What we quote is what you pay, with transparent breakdowns.' },
					{ bold: 'Flexible Rescheduling:', text: 'Free rescheduling options up to 48 hours before moving day.' },
					{ bold: 'Full Packaging Support:', text: 'We supply custom boxes, thick bubble wrap, and structural crating.' }
				]
			},
			'image-gallery.html': {
				title: 'A visual showcase of our <span>professional execution</span>',
				desc: 'Browse through our gallery of live relocations, fine art handling, industrial moving setups, and organized storage layouts.',
				image: 'images/gallery-1.jpg',
				cta: 'BOOK A MOVE TODAY',
				checklist: [
					{ bold: 'Real-time Captures:', text: 'Actual photos of our moving teams, clean trucks, and operations.' },
					{ bold: 'Meticulous Care:', text: 'Visual proof of our heavy bubble wrapping and floor runner protection.' },
					{ bold: 'Unrivaled Efficiency:', text: 'Highly organized loading systems utilizing maximum truck volume safely.' }
				]
			},
			'projects.html': {
				title: 'Enterprise & large-scale <span>relocation projects</span>',
				desc: 'From massive corporate offices to multi-family estates, we coordinate heavy equipment, workspace furniture, and records with absolute precision.',
				image: 'images/project-1.jpg',
				cta: 'PLAN A COMMERCIAL MOVE',
				checklist: [
					{ bold: 'Dedicated Site Managers:', text: 'A single point of contact to coordinate logistics and timing.' },
					{ bold: 'Zero Operations Interruption:', text: 'Weekend and after-hours shifting schedules to maintain business flow.' },
					{ bold: 'Custom IT Handling:', text: 'Specialized packing and transport of servers, network switches, and screens.' }
				]
			},
			'project-single.html': {
				title: 'Meticulous handling for <span>demanding moves</span>',
				desc: 'Every project demands unique packing configurations, precise timelines, and specialized lifting gear. See how we deliver on our promise.',
				image: 'images/gallery-2.jpg',
				cta: 'PLAN A SIMILAR RELOCATION',
				checklist: [
					{ bold: 'Custom crating:', text: 'Wood crates built on-site to secure crystal chandeliers and heavy art.' },
					{ bold: 'Pre-move planning sweeps:', text: 'Detailed volumetric surveys to prepare logistics blueprints.' },
					{ bold: 'Tailored fleet setups:', text: 'Multiple closed trucks dispatched to synchronize loading.' }
				]
			},
			'services.html': {
				title: 'Tailored packages for every <span>relocation need</span>',
				desc: 'Whether moving a single couch, a high-rise office block, or shifting cross-country, we have a specialized moving team for you.',
				image: 'images/service-entry-image.jpg',
				cta: 'GET A SERVICE ESTIMATE',
				checklist: [
					{ bold: 'Full-Service Packing:', text: 'Leave the heavy lifting and bubble-wrapping to our trained crews.' },
					{ bold: 'Specialized Gear:', text: 'Equipped with heavy-duty trolleys, hoisting straps, and toolkits.' },
					{ bold: 'Kenyan Coverage:', text: 'Reliable home transitions from Nairobi to any town in Kenya.' }
				]
			},
			'team.html': {
				title: 'Meet the experts behind your <span>smooth transition</span>',
				desc: 'Our moving teams are not just strong hands; they are professional packers, furniture assembly specialists, and logistics experts.',
				image: 'images/team-1.jpg',
				cta: 'HIRE OUR SPECIALISTS',
				checklist: [
					{ bold: 'Extensively Vetted:', text: 'Every crew member undergoes thorough background checks and security sweeps.' },
					{ bold: 'Certified Training:', text: 'Continuous training in high-end fragile packing and furniture assembly.' },
					{ bold: 'Friendly & Polite:', text: 'Movers who value your home space and respect your privacy.' }
				]
			},
			'team-single.html': {
				title: 'Crew leaders dedicated to <span>service excellence</span>',
				desc: 'Relocating with NairobiSwift Movers means having experienced supervisors direct packing teams and manage transit schedules on-site.',
				image: 'images/team-2.jpg',
				cta: 'HIRE THIS RELOCATION CREW',
				checklist: [
					{ bold: 'Proven Field Directors:', text: 'Supervisors with 5+ years of leading residential and office moves.' },
					{ bold: 'Inventory accountability:', text: 'Supervised checklist tracking for every box loaded onto the truck.' },
					{ bold: 'On-site issue resolution:', text: 'Quick answers and coordination to customize your move on the fly.' }
				]
			},
			'testimonials.html': {
				title: 'Don\'t take our word for it—read our <span>reviews</span>',
				desc: 'With a 4.9-star rating across multiple independent review platforms, customer trust is our greatest pride.',
				image: 'images/satisfy-customer-img-1.jpg',
				cta: 'START YOUR RELOCATION',
				checklist: [
					{ bold: '4.9/5 Rating Average:', text: 'Based on hundreds of verified reviews on Google, Jiji, and Facebook.' },
					{ bold: 'Referral-Driven Growth:', text: 'Over 70% of our new clients come from direct recommendations.' },
					{ bold: 'Responsive Resolution:', text: 'Immediate management response to any custom feedback or query.' }
				]
			},
			'video-gallery.html': {
				title: 'Watch our moving crew in <span>active motion</span>',
				desc: 'Check out our video walkthroughs demonstrating our packing techniques, neat truck loading, and high-floor balcony hoisting.',
				image: 'images/gallery-3.jpg',
				cta: 'GET YOUR VIDEO QUOTE',
				checklist: [
					{ bold: 'Step-by-Step Footage:', text: 'Watch exactly how we protect, pack, and transition fragile household cargo.' },
					{ bold: 'Specialized Hoisting:', text: 'Video captures of our expert balcony rigging for heavy, oversized furniture.' },
					{ bold: 'Safe Fleet Operations:', text: 'Visual display of our secure, closed trucks during transit.' }
				]
			}
		};

		var pathname = window.location.pathname;
		var pageName = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';
		pageName = pageName.replace('.php', '.html');

		var highlight = null;
		if (serviceSlug && servicesHighlights[serviceSlug]) {
			highlight = servicesHighlights[serviceSlug];
		} else if (storageSlug && storageHighlights[storageSlug]) {
			highlight = storageHighlights[storageSlug];
		} else if (staticHighlights[pageName]) {
			highlight = staticHighlights[pageName];
		} else {
			// Fallback highlight data (default to moving block)
			highlight = {
				title: 'Put your feet up with our complete <span>moving</span> experience',
				desc: 'Our professional moving crew manages everything from dismantling complex furniture to wrapping fragile glassware in thick bubble wraps.',
				image: 'images/moving_section_photo.png',
				cta: 'GET A MOVING QUOTE',
				checklist: [
					{ bold: 'Fragile & Fine Art Wrapping:', text: 'Double-layered bubble wrap and custom edge guards.' },
					{ bold: 'Furniture Assembly & Placement:', text: 'Wardrobes assembled and TVs mounted.' },
					{ bold: 'All-Weather Closed Trucks:', text: 'Secure enclosed trucks for safe transport.' }
				]
			};
		}

		if (highlight) {
			var $highlightSec = $('.dynamic-highlights-section');
			if ($highlightSec.length) {
				$highlightSec.find('.dynamicHighlightImg').attr('src', highlight.image);
				$highlightSec.find('.dynamicHighlightTitle').html(highlight.title);
				$highlightSec.find('.dynamicHighlightDesc').text(highlight.desc);
				
				var $checklist = $highlightSec.find('.dynamicHighlightChecklist');
				$checklist.empty();
				highlight.checklist.forEach(function(item) {
					$checklist.append(`
						<li>
							<div class="checklist-icon"><i class="fas fa-check"></i></div>
							<div class="checklist-text"><strong>${item.bold}</strong> ${item.text}</div>
						</li>
					`);
				});
				
				$highlightSec.find('.dynamicHighlightBtn').html(highlight.cta + ' <i class="fas fa-arrow-up-right"></i>');
			}
		}
	}

	const SUB_CATEGORIES = {
		"Household/Residential": [
			{ value: "Single Room", text: "Single Room" },
			{ value: "Bedsitter", text: "Bedsitter" },
			{ value: "Studio", text: "Studio" },
			{ value: "One Bedroom", text: "One Bedroom" },
			{ value: "Two Bedroom", text: "Two Bedroom" },
			{ value: "Three Bedroom", text: "Three Bedroom" },
			{ value: "Four Bedroom or Larger", text: "Four Bedroom or Larger" },
			{ value: "Villa / Mansion", text: "Villa / Mansion" }
		],
		"Office/Commercial": [
			{ value: "Small Office", text: "Small Office (1-5 staff)" },
			{ value: "Medium Office", text: "Medium Office (6-20 staff)" },
			{ value: "Large Corporate", text: "Large Corporate (20+ staff)" },
			{ value: "Retail Store / Shop", text: "Retail Store / Shop" },
			{ value: "Warehouse / Industrial", text: "Warehouse / Industrial" }
		],
		"Single/Few Items": [
			{ value: "Single Appliance", text: "Single Appliance (e.g. Fridge, Cooker)" },
			{ value: "Single Furniture Piece", text: "Single Furniture Piece (e.g. Sofa, Bed)" },
			{ value: "Few Boxes / Luggage Only", text: "Few Boxes / Luggage Only" },
			{ value: "Electronics", text: "Electronics (e.g. TV, Server)" },
			{ value: "Other Single Item", text: "Other Single Item" }
		],
		"Inter-County Move": [
			{ value: "Household Move", text: "Household Move (Inter-County)" },
			{ value: "Office Move", text: "Office Move (Inter-County)" },
			{ value: "Single/Few Items", text: "Single/Few Items (Inter-County)" }
		],
		"International Moving": [
			{ value: "Air Freight", text: "Air Freight (Urgent/Small)" },
			{ value: "Sea Freight - LCL", text: "Sea Freight - LCL (Shared Container)" },
			{ value: "Sea Freight - FCL", text: "Sea Freight - FCL (Full Container)" },
			{ value: "Land Freight", text: "Land Freight (East Africa region)" }
		]
	};

	/* ── Inject Quote Modal HTML markup dynamically if not present ── */
	function injectQuoteModal() {
		if ($('#quoteModal').length) return;

		var modalHtml = `
		<div id="quoteModal" class="qm-backdrop" role="dialog" aria-modal="true" aria-labelledby="qmTitle">
			<div class="qm-card">
				<button class="qm-close-btn" id="closeQuoteModal" aria-label="Close modal">&times;</button>
				
				<div id="qmSuccessState" class="qm-success-state">
					<div class="qm-success-icon">
						<i class="fas fa-check"></i>
					</div>
					<h3 id="qmSuccessTitle">Quote Request Received!</h3>
					<p id="qmSuccessText">Thank you! We've received your relocations details. Our team is already looking at it and will reach out to you shortly.</p>
					<div class="qm-success-tracking">
						Tracking ID: <strong id="qmSuccessTrackingId">MV-XXXX</strong>
					</div>
					<button class="qm-btn-success-close" id="successCloseBtn">Close Window</button>
				</div>

				<div id="qmFormWrapper">
					<div class="qm-header">
						<div class="qm-icon-wrapper">
							<i class="fas fa-shipping-fast"></i>
						</div>
						<h2 id="qmTitle">Get a Relocation Quote</h2>
						<p>Enter your details and get customized, transparent moving estimates.</p>
						<div class="qm-tracking-badge">
							Tracking ID: <strong id="qmTrackingId">MV-XXXX</strong>
						</div>
					</div>

					<form id="qmForm" novalidate>
						<div class="qm-form-grid">
							
							<div class="qm-field-group">
								<label for="qmName">Your Name</label>
								<div class="qm-input-container">
									<input type="text" id="qmName" placeholder="John Doe" required autocomplete="name">
									<i class="fas fa-user"></i>
								</div>
								<span class="qm-error-msg" id="qmNameError">Please enter your name</span>
							</div>

							<div class="qm-field-group">
								<label for="qmPhone">Phone Number</label>
								<div class="qm-input-container">
									<input type="tel" id="qmPhone" placeholder="+254 712 345678" required autocomplete="tel">
									<i class="fas fa-phone-alt"></i>
								</div>
								<span class="qm-error-msg" id="qmPhoneError">Please enter your phone number</span>
							</div>

							<div class="qm-field-group">
								<label for="qmEmail">Email Address</label>
								<div class="qm-input-container">
									<input type="email" id="qmEmail" placeholder="john@example.com" required autocomplete="email">
									<i class="fas fa-envelope"></i>
								</div>
								<span class="qm-error-msg" id="qmEmailError">Please enter a valid email address</span>
							</div>

							<div class="qm-field-group">
								<label for="qmDate">Move Date</label>
								<div class="qm-input-container">
									<input type="date" id="qmDate" required>
									<i class="fas fa-calendar-alt"></i>
								</div>
								<span class="qm-error-msg" id="qmDateError">Please choose a date</span>
							</div>

							<div class="qm-field-group qm-field-full">
								<label for="qmFrom">Moving From</label>
								<div class="qm-input-container">
									<input type="text" id="qmFrom" placeholder="Origin Location" required autocomplete="off">
									<i class="fas fa-map-marker-alt"></i>
									<div class="custom-autocomplete-suggestions" id="qm-from-suggestions"></div>
								</div>
								<span class="qm-error-msg" id="qmFromError">Please enter origin location</span>
							</div>

							<div class="qm-field-group qm-field-full">
								<label for="qmTo">Moving To</label>
								<div class="qm-input-container">
									<input type="text" id="qmTo" placeholder="Destination Location" required autocomplete="off">
									<i class="fas fa-map-marker-alt"></i>
									<div class="custom-autocomplete-suggestions" id="qm-to-suggestions"></div>
								</div>
								<span class="qm-error-msg" id="qmToError">Please enter destination location</span>
							</div>

							<div class="qm-field-group qm-field-full">
								<label for="qmMoveType">Type of Move</label>
								<div class="qm-input-container qm-select-wrapper">
									<select id="qmMoveType" required>
										<option value="" disabled selected>Select moving type...</option>
										<option value="Household/Residential">Household / Residential Move</option>
										<option value="Office/Commercial">Office / Commercial Relocation</option>
										<option value="Single/Few Items">Single / Few Items Delivery</option>
										<option value="Inter-County Move">Inter-County Move</option>
										<option value="International Moving">International Moving</option>
									</select>
									<i class="fas fa-truck-loading"></i>
								</div>
								<span class="qm-error-msg" id="qmMoveTypeError">Please select a type of move</span>
							</div>

							<!-- Dynamic Sub-category for Modal -->
							<div class="qm-field-group qm-field-full" id="qmSubMoveTypeContainer" style="display: none; margin-top: 5px;">
								<label for="qmSubMoveType">Specific Type / Size of Move</label>
								<div class="qm-input-container qm-select-wrapper">
									<select id="qmSubMoveType" required>
										<option value="" disabled selected>Select size/option...</option>
									</select>
									<i class="fas fa-boxes"></i>
								</div>
								<span class="qm-error-msg" id="qmSubMoveTypeError">Please specify your move size/category</span>
							</div>

						</div>

						<div class="qm-action-row">
							<button type="button" class="qm-btn qm-btn-whatsapp" id="qmWhatsAppBtn">
								<i class="fab fa-whatsapp"></i> Send via WhatsApp
							</button>
							<button type="submit" class="qm-btn qm-btn-submit" id="qmSubmitBtn">
								<i class="fas fa-paper-plane"></i> Get Free Quote
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		`;
		$('body').append(modalHtml);
	}

	var currentTrackingId = '';

	function generateTrackingId() {
		const chars = '0123456789';
		let result = '';
		for (let i = 0; i < 4; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return 'MV-' + result;
	}

	function escapeHTML(str) {
		return str.replace(/[&<>'"]/g, 
			tag => ({
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				"'": '&#39;',
				'"': '&quot;'
			}[tag] || tag)
		);
	}

	function initSubCategoryDropdowns() {
		// Homepage & page-header quote forms
		$('#homeMoveType').each(function() {
			const $group = $(this).closest('.qm-field-group');
			if ($group.next('#homeSubMoveTypeContainer').length === 0) {
				const html = `
					<div class="qm-field-group qm-field-full" id="homeSubMoveTypeContainer" style="display: none; margin-top: 5px;">
						<label for="homeSubMoveType">Specific Type / Size of Move</label>
						<div class="qm-input-container qm-select-wrapper">
							<select id="homeSubMoveType" required>
								<option value="" disabled selected>Select size/option...</option>
							</select>
							<i class="fas fa-boxes"></i>
						</div>
						<span class="qm-error-msg" id="homeSubMoveTypeError">Please specify your move size/category</span>
					</div>
				`;
				$group.after(html);
			}
		});

		// Event listener for homeMoveType change
		$(document).on('change', '#homeMoveType', function() {
			const val = $(this).val();
			const $container = $('#homeSubMoveTypeContainer');
			const $select = $('#homeSubMoveType');
			
			if (val && SUB_CATEGORIES[val]) {
				$select.empty().append('<option value="" disabled selected>Select size/option...</option>');
				SUB_CATEGORIES[val].forEach(item => {
					$select.append(`<option value="${item.value}">${item.text}</option>`);
				});
				$container.slideDown(200);
			} else {
				$container.slideUp(200);
				$select.val('');
			}
		});

		// Event listener for qmMoveType change (Modal)
		$(document).on('change', '#qmMoveType', function() {
			const val = $(this).val();
			const $container = $('#qmSubMoveTypeContainer');
			const $select = $('#qmSubMoveType');
			
			if (val && SUB_CATEGORIES[val]) {
				$select.empty().append('<option value="" disabled selected>Select size/option...</option>');
				SUB_CATEGORIES[val].forEach(item => {
					$select.append(`<option value="${item.value}">${item.text}</option>`);
				});
				$container.slideDown(200);
			} else {
				$container.slideUp(200);
				$select.val('');
			}
		});
	}

	function initQuoteModal() {
		injectQuoteModal();
		initSubCategoryDropdowns();

		const $modal = $('#quoteModal');
		if (!$modal.length) return;

		// Set date min attribute
		const $qmDate = $('#qmDate');
		if ($qmDate.length) {
			const today = new Date();
			const yyyy = today.getFullYear();
			let mm = today.getMonth() + 1;
			let dd = today.getDate();
			if (mm < 10) mm = '0' + mm;
			if (dd < 10) dd = '0' + dd;
			$qmDate.attr('min', yyyy + '-' + mm + '-' + dd);
		}

		// Helper to open modal
		function openModal(prefill = false) {
			currentTrackingId = generateTrackingId();
			$('#qmTrackingId').text(currentTrackingId);
			$('#qmSuccessTrackingId').text(currentTrackingId);

			const $heroFrom = $('#heroFromInput');
			const $heroTo = $('#heroToInput');
			const $qmFrom = $('#qmFrom');
			const $qmTo = $('#qmTo');

			if (prefill && $heroFrom.length && $heroFrom.val().trim() !== '') {
				$qmFrom.val($heroFrom.val().trim());
			} else {
				$qmFrom.val('');
			}
			if (prefill && $heroTo.length && $heroTo.val().trim() !== '') {
				$qmTo.val($heroTo.val().trim());
			} else {
				$qmTo.val('');
			}

			// Show form, hide success state
			$('#qmFormWrapper').show();
			$('#qmSuccessState').hide();

			$modal.addClass('qm-active');
			$('body').css('overflow', 'hidden');
		}

		// Helper to close modal
		function closeModal() {
			$modal.removeClass('qm-active');
			$('body').css('overflow', '');
			if ($('#qmForm').length) {
				$('#qmForm')[0].reset();
			}
			$('#qmSubMoveTypeContainer').hide();
			clearErrors();
		}

		function clearErrors() {
			$modal.find('.qm-input-error').removeClass('qm-input-error');
			$modal.find('.qm-select-error').removeClass('qm-select-error');
			$modal.find('.qm-label-error').removeClass('qm-label-error');
			$modal.find('.qm-field-error-shake').removeClass('qm-field-error-shake');
			$modal.find('.qm-error-msg').hide();
		}

		function showError(fieldId, errorMsg) {
			let actualFieldId = fieldId;
			let actualErrorSpanId = fieldId + 'Error';
			if (fieldId.endsWith('Error')) {
				actualFieldId = fieldId.substring(0, fieldId.length - 5);
				actualErrorSpanId = fieldId;
			}

			const $field = $('#' + actualFieldId);
			const $errorSpan = $('#' + actualErrorSpanId);
			if ($field.length) {
				$field.addClass('qm-input-error');
				const $group = $field.closest('.qm-field-group');
				$group.find('label').addClass('qm-label-error');
				$group.addClass('qm-field-error-shake');
				setTimeout(() => {
					$group.removeClass('qm-field-error-shake');
				}, 500);

				if ($field.parent().hasClass('qm-select-wrapper')) {
					$field.parent().addClass('qm-select-error');
				}
			}
			if ($errorSpan.length) {
				if (errorMsg) $errorSpan.text(errorMsg);
				$errorSpan.show();
			}
		}

		function validateEmail(email) {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}

		function validateForm() {
			clearErrors();
			let isValid = true;

			const name = $('#qmName').val().trim();
			const phone = $('#qmPhone').val().trim();
			const email = $('#qmEmail').val().trim();
			const date = $('#qmDate').val();
			const fromLoc = $('#qmFrom').val().trim();
			const toLoc = $('#qmTo').val().trim();
			const moveType = $('#qmMoveType').val();

			if (name === '') {
				showError('qmName', 'Please enter your name');
				isValid = false;
			}
			if (phone === '') {
				showError('qmPhone', 'Please enter your phone number');
				isValid = false;
			}
			if (email === '') {
				showError('qmEmail', 'Please enter your email address');
				isValid = false;
			} else if (!validateEmail(email)) {
				showError('qmEmail', 'Please enter a valid email address');
				isValid = false;
			}
			if (date === '') {
				showError('qmDate', 'Please choose a date');
				isValid = false;
			} else {
				const selectedDate = new Date(date);
				const today = new Date();
				today.setHours(0,0,0,0);
				selectedDate.setHours(0,0,0,0);
				if (selectedDate < today) {
					showError('qmDate', 'Date cannot be in the past');
					isValid = false;
				}
			}
			if (fromLoc === '') {
				showError('qmFrom', 'Please enter origin location');
				isValid = false;
			}
			if (toLoc === '') {
				showError('qmTo', 'Please enter destination location');
				isValid = false;
			}
			if (!moveType) {
				showError('qmMoveTypeError', 'Please select a type of move');
				isValid = false;
			} else {
				const subMoveTypeVisible = $('#qmSubMoveTypeContainer').is(':visible');
				const subMoveType = $('#qmSubMoveType').val() || '';
				if (subMoveTypeVisible && !subMoveType) {
					showError('qmSubMoveTypeError', 'Please specify your move size/category');
					isValid = false;
				}
			}

			return isValid;
		}

		function triggerSuccessState(userName, contactInfo) {
			$('#qmSuccessText').html(`Thank you, <strong>${escapeHTML(userName)}</strong>! We have received your relocation details. Our moving specialists are already analyzing your request and will contact you shortly at <strong>${escapeHTML(contactInfo)}</strong>. Reference your Tracking ID below to follow up.`);
			
			const $wrapper = $('#qmFormWrapper');
			$wrapper.css('transition', 'opacity 0.3s ease');
			$wrapper.css('opacity', '0');
			
			setTimeout(() => {
				$wrapper.hide().css('opacity', '1');
				$('#qmSuccessState').css('display', 'flex');
			}, 300);

			// Redirect to thank-you.html card page after 8 seconds
			setTimeout(() => {
				window.location.href = 'thank-you.html?tracking_id=' + encodeURIComponent(currentTrackingId || 'MV-8345');
			}, 8000);
		}

		// Triggers
		$(document).on('click', '#openQuoteModal', function() {
			openModal(true);
		});

		$(document).on('click', '.header-btn a, .promo-btn, .highlight-cta-btn', function(e) {
			e.preventDefault();
			openModal(false);
		});

		// Closes
		$(document).on('click', '#closeQuoteModal, #successCloseBtn', closeModal);
		$modal.on('click', function(e) {
			if (e.target === $modal[0]) closeModal();
		});
		$(document).on('keydown', function(e) {
			if (e.key === 'Escape' && $modal.hasClass('qm-active')) closeModal();
		});

		function savePopupQuoteToLocalStorage() {
			const name = ($('#qmName').val() || '').trim();
			const phone = ($('#qmPhone').val() || '').trim();
			const email = ($('#qmEmail').val() || '').trim();
			const date = $('#qmDate').val() || '';
			const fromLoc = ($('#qmFrom').val() || '').trim();
			const toLoc = ($('#qmTo').val() || '').trim();
			const moveTypeValue = $('#qmMoveType').val() || '';

			// Map move type
			let mappedType = 'Home Relocation';
			if (moveTypeValue === 'Office/Commercial') {
				mappedType = 'Office Relocation';
			} else if (moveTypeValue === 'Inter-County Move' || moveTypeValue === 'International Moving') {
				mappedType = 'Long Distance';
			} else if (moveTypeValue === 'Single/Few Items') {
				mappedType = 'Home Relocation';
			}

			const subMoveTypeVal = $('#qmSubMoveTypeContainer').is(':visible') ? $('#qmSubMoveType').val() : '';
			let finalMoveType = mappedType;
			if (subMoveTypeVal) {
				finalMoveType = `${mappedType} (${subMoveTypeVal})`;
			}
			const instructionsText = subMoveTypeVal 
				? `Relocation size/category: ${subMoveTypeVal}. Relocation request sent via website modal quote form.` 
				: 'Relocation request sent via website modal quote form.';

			// Retrieve or initialize quotes list
			let storageQuotes = [];
			try {
				const stored = localStorage.getItem('nsm_quotes');
				if (stored) {
					storageQuotes = JSON.parse(stored);
				} else {
					storageQuotes = [
						{
							id: 'TPM-4820-A',
							customerName: 'John Kamau',
							email: 'john.kamau@gmail.com',
							phone: '+254712345678',
							dateReceived: '2026-07-04',
							moveDate: '2026-07-10',
							pickup: 'Kilimani, Nairobi',
							delivery: 'Runda, Nairobi',
							moveType: 'Home Relocation',
							status: 'Pending Quote',
							cost: 0,
							instructions: 'Includes bulky refrigerator, 3 large wardrobe boxes. Ground floor pickup to double story house.'
						},
						{
							id: 'TPM-9102-B',
							customerName: 'Sarah Wambui',
							email: 'wambui.sarah@yahoo.com',
							phone: '+254722987654',
							dateReceived: '2026-07-03',
							moveDate: '2026-07-15',
							pickup: 'Westlands, Nairobi',
							delivery: 'Nyali, Mombasa',
							moveType: 'Office Relocation',
							status: 'Quote Sent',
							cost: 45000,
							instructions: '6 office workstations, filing cabinets, and servers. Long distance overnight transit required.'
						},
						{
							id: 'TPM-5531-C',
							customerName: 'David Omondi',
							email: 'david.omondi@outlook.com',
							phone: '+254733111222',
							dateReceived: '2026-07-05',
							moveDate: '2026-07-18',
							pickup: 'Karen, Nairobi',
							delivery: 'Milimani, Nakuru',
							moveType: 'Home Relocation',
							status: 'Pending Quote',
							cost: 0,
							instructions: 'Relocating complete 3-bedroom household items. Demounting and mounting service requested.'
						}
					];
				}
			} catch(e) {
				console.error(e);
			}

			// Prevent duplicate entries
			const exists = storageQuotes.some(q => q.id === currentTrackingId);
			if (!exists) {
				const newQuote = {
					id: currentTrackingId,
					customerName: name,
					email: email || 'N/A',
					phone: phone,
					dateReceived: new Date().toISOString().split('T')[0],
					moveDate: date,
					pickup: fromLoc,
					delivery: toLoc,
					moveType: finalMoveType,
					status: 'Pending Quote',
					cost: 0,
					instructions: instructionsText
				};
				storageQuotes.unshift(newQuote);
				localStorage.setItem('nsm_quotes', JSON.stringify(storageQuotes));

				// Save to real database
				fetch('https://formspree.io/f/mqpevyga', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
					body: JSON.stringify({
						formType: 'Moving Quote Request',
						trackingId: newQuote.id,
						customerName: newQuote.customerName,
						phone: newQuote.phone,
						email: newQuote.email,
						moveDate: newQuote.moveDate,
						pickup: newQuote.pickup,
						delivery: newQuote.delivery,
						moveType: newQuote.moveType,
						instructions: newQuote.instructions,
						dateReceived: newQuote.dateReceived
					})
				}).catch(err => console.error('Formspree dispatch failed:', err));
			}
		}

		function saveHeaderQuoteToLocalStorage($form) {
			const name = ($form.find('input[name="name"]').val() || '').trim();
			const phone = ($form.find('input[name="phone"]').val() || '').trim();
			const email = ($form.find('input[name="email"]').val() || '').trim();
			const fromLoc = ($form.find('input[name="moving_from"]').val() || '').trim();
			const toLoc = ($form.find('input[name="moving_to"]').val() || '').trim();

			// Retrieve or initialize quotes list
			let storageQuotes = [];
			try {
				const stored = localStorage.getItem('nsm_quotes');
				if (stored) {
					storageQuotes = JSON.parse(stored);
				} else {
					storageQuotes = [
						{
							id: 'TPM-4820-A',
							customerName: 'John Kamau',
							email: 'john.kamau@gmail.com',
							phone: '+254712345678',
							dateReceived: '2026-07-04',
							moveDate: '2026-07-10',
							pickup: 'Kilimani, Nairobi',
							delivery: 'Runda, Nairobi',
							moveType: 'Home Relocation',
							status: 'Pending Quote',
							cost: 0,
							instructions: 'Includes bulky refrigerator, 3 large wardrobe boxes. Ground floor pickup to double story house.'
						},
						{
							id: 'TPM-9102-B',
							customerName: 'Sarah Wambui',
							email: 'wambui.sarah@yahoo.com',
							phone: '+254722987654',
							dateReceived: '2026-07-03',
							moveDate: '2026-07-15',
							pickup: 'Westlands, Nairobi',
							delivery: 'Nyali, Mombasa',
							moveType: 'Office Relocation',
							status: 'Quote Sent',
							cost: 45000,
							instructions: '6 office workstations, filing cabinets, and servers. Long distance overnight transit required.'
						},
						{
							id: 'TPM-5531-C',
							customerName: 'David Omondi',
							email: 'david.omondi@outlook.com',
							phone: '+254733111222',
							dateReceived: '2026-07-05',
							moveDate: '2026-07-18',
							pickup: 'Karen, Nairobi',
							delivery: 'Milimani, Nakuru',
							moveType: 'Home Relocation',
							status: 'Pending Quote',
							cost: 0,
							instructions: 'Relocating complete 3-bedroom household items. Demounting and mounting service requested.'
						}
					];
				}
			} catch(e) {
				console.error(e);
			}

			// Prevent duplicate entries
			const exists = storageQuotes.some(q => q.id === currentTrackingId);
			if (!exists) {
				const newQuote = {
					id: currentTrackingId,
					customerName: name,
					email: email || 'N/A',
					phone: phone,
					dateReceived: new Date().toISOString().split('T')[0],
					moveDate: 'Flexible / Unscheduled',
					pickup: fromLoc,
					delivery: toLoc,
					moveType: 'Home Relocation',
					status: 'Pending Quote',
					cost: 0,
					instructions: 'Relocation request sent via subpage quick header form.'
				};
				storageQuotes.unshift(newQuote);
				localStorage.setItem('nsm_quotes', JSON.stringify(storageQuotes));
			}
		}

		// Form submit
		$(document).on('submit', '#qmForm', function(e) {
			e.preventDefault();
			if (validateForm()) {
				savePopupQuoteToLocalStorage();
				const name = $('#qmName').val().trim();
				const email = $('#qmEmail').val().trim();
				triggerSuccessState(name, email);
			}
		});

		// WhatsApp submit
		$(document).on('click', '#qmWhatsAppBtn', function() {
			if (validateForm()) {
				savePopupQuoteToLocalStorage();
				const name = $('#qmName').val().trim();
				const phone = $('#qmPhone').val().trim();
				const email = $('#qmEmail').val().trim();
				const date = $('#qmDate').val();
				const fromLoc = $('#qmFrom').val().trim();
				const toLoc = $('#qmTo').val().trim();
				const moveType = $('#qmMoveType option:selected').text();

				const subMoveTypeVal = $('#qmSubMoveTypeContainer').is(':visible') ? $('#qmSubMoveType option:selected').text() : '';
				const moveTypeDisplay = subMoveTypeVal ? `${moveType} (${subMoveTypeVal})` : moveType;

				const waText = `Hi NairobiSwift Movers, I would like to request a quote:\n\n` +
							   `*Tracking ID:* ${currentTrackingId}\n` +
							   `*Name:* ${name}\n` +
							   `*Phone:* ${phone}\n` +
							   `*Email:* ${email}\n` +
							   `*Move Date:* ${date}\n` +
							   `*Moving From:* ${fromLoc}\n` +
							   `*Moving To:* ${toLoc}\n` +
							   `*Type of Move:* ${moveTypeDisplay}`;

				const waUrl = `https://wa.me/254704372636?text=${encodeURIComponent(waText)}`;
				window.open(waUrl, '_blank');
				triggerSuccessState(name, phone);
			}
		});

		// Subpage Header form submit
		$(document).on('submit', '.header-quote-form', function(e) {
			e.preventDefault();
			const $form = $(this);

			const name = $form.find('input[name="name"]').val().trim();
			const phone = $form.find('input[name="phone"]').val().trim();
			const email = $form.find('input[name="email"]').val().trim();
			const fromLoc = $form.find('input[name="moving_from"]').val().trim();
			const toLoc = $form.find('input[name="moving_to"]').val().trim();

			if (name === '' || phone === '' || email === '' || fromLoc === '' || toLoc === '') return;

			currentTrackingId = generateTrackingId();
			saveHeaderQuoteToLocalStorage($form);
			
			$('#qmTrackingId').text(currentTrackingId);
			$('#qmSuccessTrackingId').text(currentTrackingId);

			triggerSuccessState(name, email);
			$form[0].reset();
		});

		// ── Homepage Inline Form Logic ──
		const $homeDate = $('#homeDate');
		if ($homeDate.length) {
			flatpickr("#homeDate", {
				dateFormat: "Y-m-d",
				minDate: "today",
				disableMobile: true // Disables native mobile datepicker to show custom styled Flatpickr on phones
			});
		}

		let homeTrackingId = $('.homeTrackingId').first().text();
		if (!homeTrackingId || homeTrackingId.trim() === 'MV-XXXX') {
			homeTrackingId = generateTrackingId();
		}
		$('.homeTrackingId').text(homeTrackingId);
		$('.homeSuccessTrackingId').text(homeTrackingId);

		function validateHomeForm() {
			clearHomeErrors();
			let isValid = true;

			const name = ($('#homeName').val() || '').trim();
			const phone = ($('#homePhone').val() || '').trim();
			const email = ($('#homeEmail').val() || '').trim();
			const date = $('#homeDate').val() || '';
			const fromLoc = ($('#homeFrom').val() || '').trim();
			const toLoc = ($('#homeTo').val() || '').trim();
			const moveType = $('#homeMoveType').val() || '';

			if (name === '') {
				showHomeError('homeName', 'Please enter your name');
				isValid = false;
			}
			if (phone === '') {
				showHomeError('homePhone', 'Please enter your phone number');
				isValid = false;
			}
			if (email === '') {
				showHomeError('homeEmail', 'Please enter your email address');
				isValid = false;
			} else if (!validateEmail(email)) {
				showHomeError('homeEmail', 'Please enter a valid email address');
				isValid = false;
			}
			if (date === '') {
				showHomeError('homeDate', 'Please choose a date');
				isValid = false;
			} else {
				const selectedDate = new Date(date);
				const today = new Date();
				today.setHours(0,0,0,0);
				selectedDate.setHours(0,0,0,0);
				if (selectedDate < today) {
					showHomeError('homeDate', 'Date cannot be in the past');
					isValid = false;
				}
			}
			if (fromLoc === '') {
				showHomeError('homeFrom', 'Please enter origin location');
				isValid = false;
			}
			if (toLoc === '') {
				showHomeError('homeTo', 'Please enter destination location');
				isValid = false;
			}
			if (!moveType) {
				showHomeError('homeMoveType', 'Please select a type of move');
				isValid = false;
			} else {
				const subMoveTypeVisible = $('#homeSubMoveTypeContainer').is(':visible');
				const subMoveType = $('#homeSubMoveType').val() || '';
				if (subMoveTypeVisible && !subMoveType) {
					showHomeError('homeSubMoveType', 'Please specify your move size/category');
					isValid = false;
				}
			}

			return isValid;
		}

		function clearHomeErrors() {
			const $form = $('#homeQuoteForm');
			$form.find('.qm-input-error').removeClass('qm-input-error');
			$form.find('.qm-select-error').removeClass('qm-select-error');
			$form.find('.qm-label-error').removeClass('qm-label-error');
			$form.find('.qm-field-error-shake').removeClass('qm-field-error-shake');
			$form.find('.qm-error-msg').hide();
		}

		function showHomeError(fieldId, errorMsg) {
			let actualFieldId = fieldId;
			let actualErrorSpanId = fieldId + 'Error';
			if (fieldId.endsWith('Error')) {
				actualFieldId = fieldId.substring(0, fieldId.length - 5);
				actualErrorSpanId = fieldId;
			}

			const $field = $('#' + actualFieldId);
			const $errorSpan = $('#' + actualErrorSpanId);
			if ($field.length) {
				$field.addClass('qm-input-error');
				const $group = $field.closest('.qm-field-group');
				$group.find('label').addClass('qm-label-error');
				$group.addClass('qm-field-error-shake');
				setTimeout(() => {
					$group.removeClass('qm-field-error-shake');
				}, 500);

				if ($field.parent().hasClass('qm-select-wrapper')) {
					$field.parent().addClass('qm-select-error');
				}
			}
			if ($errorSpan.length) {
				if (errorMsg) $errorSpan.text(errorMsg);
				$errorSpan.show();
			}
		}

		function triggerHomeSuccessState(userName, contactInfo) {
			$('#homeSuccessText').html(`Thank you, <strong>${escapeHTML(userName)}</strong>! We have received your relocation details. Our moving specialists are already analyzing your request and will contact you shortly at <strong>${escapeHTML(contactInfo)}</strong>. Reference your Tracking ID below to follow up.`);
			
			const $wrapper = $('#homeFormWrapper');
			$wrapper.css('transition', 'opacity 0.3s ease');
			$wrapper.css('opacity', '0');
			
			setTimeout(() => {
				$wrapper.hide().css('opacity', '1');
				$('#homeSuccessState').css('display', 'flex');
			}, 300);

			// Redirect to thank-you.html card page after 8 seconds
			setTimeout(() => {
				window.location.href = 'thank-you.html?tracking_id=' + encodeURIComponent(homeTrackingId || 'MV-8345');
			}, 8000);
		}

		function savePublicQuoteToLocalStorage() {
			const name = ($('#homeName').val() || '').trim();
			const phone = ($('#homePhone').val() || '').trim();
			const email = ($('#homeEmail').val() || '').trim();
			const date = $('#homeDate').val() || '';
			const fromLoc = ($('#homeFrom').val() || '').trim();
			const toLoc = ($('#homeTo').val() || '').trim();
			const moveTypeValue = $('#homeMoveType').val() || '';

			// Map move type
			let mappedType = 'Home Relocation';
			if (moveTypeValue === 'Office/Commercial') {
				mappedType = 'Office Relocation';
			} else if (moveTypeValue === 'Inter-County Move' || moveTypeValue === 'International Moving') {
				mappedType = 'Long Distance';
			} else if (moveTypeValue === 'Single/Few Items') {
				mappedType = 'Home Relocation';
			}

			const subMoveTypeVal = $('#homeSubMoveTypeContainer').is(':visible') ? $('#homeSubMoveType').val() : '';
			let finalMoveType = mappedType;
			if (subMoveTypeVal) {
				finalMoveType = `${mappedType} (${subMoveTypeVal})`;
			}
			const instructionsText = subMoveTypeVal 
				? `Relocation size/category: ${subMoveTypeVal}. Relocation request sent via website public quote form.` 
				: 'Relocation request sent via website public quote form.';

			// Retrieve or initialize quotes list
			let storageQuotes = [];
			try {
				const stored = localStorage.getItem('nsm_quotes');
				if (stored) {
					storageQuotes = JSON.parse(stored);
				} else {
					// Fallback to sample data if not initialized yet
					storageQuotes = [
						{
							id: 'TPM-4820-A',
							customerName: 'John Kamau',
							email: 'john.kamau@gmail.com',
							phone: '+254712345678',
							dateReceived: '2026-07-04',
							moveDate: '2026-07-10',
							pickup: 'Kilimani, Nairobi',
							delivery: 'Runda, Nairobi',
							moveType: 'Home Relocation',
							status: 'Pending Quote',
							cost: 0,
							instructions: 'Includes bulky refrigerator, 3 large wardrobe boxes. Ground floor pickup to double story house.'
						},
						{
							id: 'TPM-9102-B',
							customerName: 'Sarah Wambui',
							email: 'wambui.sarah@yahoo.com',
							phone: '+254722987654',
							dateReceived: '2026-07-03',
							moveDate: '2026-07-15',
							pickup: 'Westlands, Nairobi',
							delivery: 'Nyali, Mombasa',
							moveType: 'Office Relocation',
							status: 'Quote Sent',
							cost: 45000,
							instructions: '6 office workstations, filing cabinets, and servers. Long distance overnight transit required.'
						},
						{
							id: 'TPM-5531-C',
							customerName: 'David Omondi',
							email: 'david.omondi@outlook.com',
							phone: '+254733111222',
							dateReceived: '2026-07-05',
							moveDate: '2026-07-18',
							pickup: 'Karen, Nairobi',
							delivery: 'Milimani, Nakuru',
							moveType: 'Home Relocation',
							status: 'Pending Quote',
							cost: 0,
							instructions: 'Relocating complete 3-bedroom household items. Demounting and mounting service requested.'
						}
					];
				}
			} catch(e) {
				console.error(e);
			}

			// Prevent duplicate entries
			const exists = storageQuotes.some(q => q.id === homeTrackingId);
			if (!exists) {
				const newQuote = {
					id: homeTrackingId,
					customerName: name,
					email: email || 'N/A',
					phone: phone,
					dateReceived: new Date().toISOString().split('T')[0],
					moveDate: date,
					pickup: fromLoc,
					delivery: toLoc,
					moveType: finalMoveType,
					status: 'Pending Quote',
					cost: 0,
					instructions: instructionsText
				};
				storageQuotes.unshift(newQuote);
				localStorage.setItem('nsm_quotes', JSON.stringify(storageQuotes));

				// Save to real database
				fetch('https://formspree.io/f/mqpevyga', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
					body: JSON.stringify({
						formType: 'Moving Quote Request',
						trackingId: newQuote.id,
						customerName: newQuote.customerName,
						phone: newQuote.phone,
						email: newQuote.email,
						moveDate: newQuote.moveDate,
						pickup: newQuote.pickup,
						delivery: newQuote.delivery,
						moveType: newQuote.moveType,
						instructions: newQuote.instructions,
						dateReceived: newQuote.dateReceived
					})
				}).catch(err => console.error('Formspree dispatch failed:', err));
			}
		}

		// Home Form submit
		$(document).on('submit', '#homeQuoteForm', function(e) {
			e.preventDefault();
			if (validateHomeForm()) {
				savePublicQuoteToLocalStorage();
				const name = $('#homeName').val().trim();
				const email = $('#homeEmail').val().trim();
				triggerHomeSuccessState(name, email);
			}
		});

		// Home WhatsApp submit
		$(document).on('click', '#homeWhatsAppBtn', function() {
			if (validateHomeForm()) {
				savePublicQuoteToLocalStorage();
				const name = $('#homeName').val().trim();
				const phone = $('#homePhone').val().trim();
				const email = $('#homeEmail').val().trim();
				const date = $('#homeDate').val();
				const fromLoc = $('#homeFrom').val().trim();
				const toLoc = $('#homeTo').val().trim();
				const moveType = $('#homeMoveType option:selected').text();

				const subMoveTypeVal = $('#homeSubMoveTypeContainer').is(':visible') ? $('#homeSubMoveType option:selected').text() : '';
				const moveTypeDisplay = subMoveTypeVal ? `${moveType} (${subMoveTypeVal})` : moveType;

				const waText = `Hi NairobiSwift Movers, I would like to request a quote:\n\n` +
							   `*Tracking ID:* ${homeTrackingId}\n` +
							   `*Name:* ${name}\n` +
							   `*Phone:* ${phone}\n` +
							   `*Email:* ${email}\n` +
							   `*Move Date:* ${date}\n` +
							   `*Moving From:* ${fromLoc}\n` +
							   `*Moving To:* ${toLoc}\n` +
							   `*Type of Move:* ${moveTypeDisplay}`;

				const waUrl = `https://wa.me/254704372636?text=${encodeURIComponent(waText)}`;
				window.open(waUrl, '_blank');
				triggerHomeSuccessState(name, phone);
			}
		});

		// Home Success close reset
		$(document).on('click', '#homeSuccessCloseBtn', function() {
			$('#homeQuoteForm')[0].reset();
			$('#homeSubMoveTypeContainer').hide();
			homeTrackingId = generateTrackingId();
			$('.homeTrackingId').text(homeTrackingId);
			$('.homeSuccessTrackingId').text(homeTrackingId);
			$('#homeSuccessState').hide();
			$('#homeFormWrapper').show();
			clearHomeErrors();
		});
	}

	function initAuthModal() {
		const $modal = $('#authModal');
		if (!$modal.length) return;

		// Function to update dynamic greeting
		function updateGreeting() {
			const hour = new Date().getHours();
			let greeting = "Good Evening";
			if (hour >= 5 && hour < 12) {
				greeting = "Good Morning";
			} else if (hour >= 12 && hour < 17) {
				greeting = "Good Afternoon";
			}
			$('#authGreeting').text(greeting);
		}

		// Open Modal
		$(document).on('click', '.trigger-auth-modal', function(e) {
			e.preventDefault();
			updateGreeting();
			$modal.addClass('active');
			$('body').css('overflow', 'hidden'); // Prevent scrolling body
		});

		// Close Modal on Close Button click
		$(document).on('click', '#authCloseBtn', function() {
			$modal.removeClass('active');
			$('body').css('overflow', '');
		});

		// Close Modal on click outside
		$modal.on('click', function(e) {
			if ($(e.target).is($modal)) {
				$modal.removeClass('active');
				$('body').css('overflow', '');
			}
		});

		// Switch tab views (Sign In / Register)
		$(document).on('click', '.auth-tab-btn', function() {
			const target = $(this).data('target');
			$('.auth-tab-btn').removeClass('active');
			$(this).addClass('active');
			
			$('.auth-form-view').removeClass('active');
			$('#' + target).addClass('active');
		});

		// Switch to Forgot Password
		$(document).on('click', '#toForgotBtn', function(e) {
			e.preventDefault();
			$('.auth-tab-btn').removeClass('active');
			$('.auth-form-view').removeClass('active');
			$('#forgot-view').addClass('active');
		});

		// Back to Login from Forgot Password
		$(document).on('click', '#backToLoginBtn', function(e) {
			e.preventDefault();
			$('.auth-tab-nav button[data-target="login-view"]').addClass('active');
			$('.auth-form-view').removeClass('active');
			$('#login-view').addClass('active');
		});

		// Toggle password visibility
		$(document).on('click', '.toggle-password', function() {
			const $input = $(this).siblings('input');
			if ($input.attr('type') === 'password') {
				$input.attr('type', 'text');
				$(this).removeClass('fa-eye').addClass('fa-eye-slash');
			} else {
				$input.attr('type', 'password');
				$(this).removeClass('fa-eye-slash').addClass('fa-eye');
			}
		});
	}

	function initInteractiveMap() {
		const regionData = {
			nairobi: {
				title: "Capital Hub & Central Coverage",
				desc: "Our main logistics headquarters in Nairobi handles daily residential moves, office relocations, and express courier deliveries. Serving Karen, Kilimani, Westlands, Runda, Muthaiga, and surrounding areas including Kiambu, Thika, Athi River, and Machakos.",
				map: "images/maps/kenyan map.png",
				stats: ["8,500+", "24/7", "3 Major"],
				pins: [
					{ label: "Nairobi", top: "58%", left: "52%" },
					{ label: "Thika", top: "51%", left: "55%" },
					{ label: "Machakos", top: "63%", left: "57%" },
					{ label: "Kiambu", top: "55%", left: "49%" }
				],
				images: [
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.48 AM (2).jpeg",
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.50 AM (1).jpeg",
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.50 AM.jpeg"
				]
			},
			coast: {
				title: "Mombasa Hub & Coastal Removal",
				desc: "Weekly consolidated long-distance moves from Nairobi to the Coast and vice-versa. Our coastal hub covers Mombasa Island, Nyali, Bamburi, Mtwapa, Kilifi, Malindi, Watamu, Diani, and Ukunda with full packing and loading teams.",
				map: "images/maps/Coast-mombasa.png",
				stats: ["1,200+", "Twice Weekly", "1 Coast"],
				pins: [
					{ label: "Mombasa", top: "55%", left: "50%" },
					{ label: "Nyali", top: "50%", left: "56%" },
					{ label: "Diani", top: "72%", left: "45%" },
					{ label: "Kilifi", top: "35%", left: "62%" },
					{ label: "Malindi", top: "20%", left: "68%" }
				],
				images: [
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.56 AM.jpeg",
					"images/choice/IMG_4495-1.jpg",
					"images/choice/home123.jpg"
				]
			},
			rift: {
				title: "Rift Valley Transit Corridor",
				desc: "High-frequency removals along the northern transit corridor. Our teams cover Naivasha, Nakuru City, Eldoret City, Kericho, Kitale, and Nanyuki. Ideal for household shifting, corporate relocations, and agricultural logistics.",
				map: "images/maps/Riftvalley.png",
				stats: ["2,100+", "Daily Transit", "2 Regional"],
				pins: [
					{ label: "Nakuru", top: "58%", left: "48%" },
					{ label: "Eldoret", top: "32%", left: "32%" },
					{ label: "Naivasha", top: "70%", left: "54%" },
					{ label: "Kericho", top: "65%", left: "28%" },
					{ label: "Kitale", top: "22%", left: "26%" }
				],
				images: [
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.43 AM.jpeg",
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.58 AM (1).jpeg",
					"images/choice/IMG_2543.jpg"
				]
			},
			western: {
				title: "Lake Victoria Hub & Western Coverage",
				desc: "Serving Kisumu City, Kakamega, Bungoma, Busia, Kisii, Homabay, and Migori. Excellent home shifting and logistics delivery, linked directly to our transit fleet from Nairobi.",
				map: "images/maps/kisumu.png",
				stats: ["980+", "3x Weekly", "1 Kisumu"],
				pins: [
					{ label: "Kisumu", top: "45%", left: "44%" },
					{ label: "Kakamega", top: "28%", left: "48%" },
					{ label: "Bungoma", top: "18%", left: "38%" },
					{ label: "Kisii", top: "68%", left: "40%" },
					{ label: "Homabay", top: "62%", left: "25%" }
				],
				images: [
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.49 AM (2).jpeg",
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.52 AM (1).jpeg",
					"images/choice/IMG_3668-1.jpg"
				]
			},
			crossborder: {
				title: "Cross-Border Regional Shifting",
				desc: "Moving your home or business across borders within East Africa. Weekly routes connecting Kenya to Uganda (Kampala, Entebbe), Tanzania (Arusha, Dar es Salaam, Kilimanjaro), and Rwanda (Kigali). Includes customs documentation assistance.",
				map: "images/maps/East-Africa.png",
				stats: ["450+", "Customs Cleared", "4 Country"],
				pins: [
					{ label: "Kampala", top: "38%", left: "35%" },
					{ label: "Arusha", top: "58%", left: "58%" },
					{ label: "Dar es Salaam", top: "75%", left: "78%" },
					{ label: "Kigali", top: "52%", left: "22%" }
				],
				images: [
					"images/choice/WhatsApp Image 2026-06-20 at 6.39.56 AM (1).jpeg",
					"images/choice/use image.jpg",
					"images/choice/IMG_4522-1.jpeg"
				]
			}
		};

		function loadRegion(regionKey) {
			const data = regionData[regionKey];
			if (!data) return;

			const $mapImg = $('#regionMapImg');
			if ($mapImg.length) {
				$mapImg.css('transition', 'opacity 0.25s ease');
				$mapImg.css('opacity', '0.2');
				setTimeout(() => {
					$mapImg.attr('src', data.map);
					$mapImg.css('opacity', '1');
				}, 250);
			}

			$('#regionDetailTitle').text(data.title);
			$('#regionDetailDesc').text(data.desc);
			$('#r-stat-1').text(data.stats[0]);
			$('#r-stat-2').text(data.stats[1]);
			$('#r-stat-3').text(data.stats[2]);

			const $pinsContainer = $('#regionPinsContainer');
			if ($pinsContainer.length) {
				$pinsContainer.empty();
				data.pins.forEach((pin, index) => {
					const $pinEl = $(`
						<div class="k-pin" style="top: ${pin.top}; left: ${pin.left}; opacity: 0; transform: translateY(10px); transition: all 0.3s ease ${index * 0.1}s;">
							<span class="k-pin-dot"></span>
							<span class="k-pin-label">${pin.label}</span>
						</div>
					`);
					$pinsContainer.append($pinEl);
					setTimeout(() => {
						$pinEl.css({ opacity: 1, transform: 'translateY(0)' });
					}, 50);
				});
			}

			const $galleryContainer = $('#regionGalleryGrid');
			if ($galleryContainer.length) {
				$galleryContainer.empty();
				data.images.forEach((imgSrc, index) => {
					const $itemEl = $(`
						<div class="region-gallery-item" style="opacity: 0; transform: scale(0.95); transition: all 0.3s ease ${index * 0.1}s;">
							<a href="${imgSrc}" class="region-gallery-popup">
								<img src="${imgSrc}" alt="${data.title} Move ${index + 1}">
							</a>
						</div>
					`);
					$galleryContainer.append($itemEl);
					setTimeout(() => {
						$itemEl.css({ opacity: 1, transform: 'scale(1)' });
					}, 50);
				});

				if ($.fn.magnificPopup) {
					$galleryContainer.magnificPopup({
						delegate: 'a',
						type: 'image',
						gallery: {
							enabled: true
						}
					});
				}
			}
		}

		if ($('.region-tabs-container').length) {
			const urlParams = new URLSearchParams(window.location.search);
			const initialRegion = urlParams.get('region') || 'nairobi';
			if (regionData[initialRegion]) {
				$('.region-tab').removeClass('active');
				$(`.region-tab[data-region="${initialRegion}"]`).addClass('active');
				loadRegion(initialRegion);
			} else {
				loadRegion('nairobi');
			}
		}

		$(document).on('click', '.region-tab', function() {
			$('.region-tab').removeClass('active');
			$(this).addClass('active');
			const regionKey = $(this).attr('data-region');
			loadRegion(regionKey);
		});
	}

	initGlobalAutocomplete();
	handleDynamicPageHeaders();
	initQuoteModal();
	initAuthModal();
	initInteractiveMap();
	
})(jQuery);