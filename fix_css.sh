sed -i '' 's/min-width: 57rem;/width: 100%;/' css/messages.css
sed -i '' 's/\.right \.chat-sidebar/.chat-sidebar/g' css/messages.css
sed -i '' '/animation: rightMenuSlide/d' css/messages.css
sed -i '' '628,645d' css/messages.css

cat << 'INNEREOF' >> css/messages.css

/* Mobile Chats Toggle Button Styles */
.mobile-chats-toggle-btn {
    display: none;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--padding-1);
    margin-bottom: 1rem;
    margin-top: 1rem;
    background: var(--color-white);
    color: var(--color-dark);
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: var(--border-radius-2);
    box-shadow: var(--box-shadow);
    cursor: pointer;
    transition: all 0.3s ease;
}
.mobile-chats-toggle-btn:hover {
    background: var(--color-light);
}
.mobile-chats-toggle-btn .icon-arrow {
    transition: transform 0.3s ease;
}
.mobile-chats-toggle-btn.active .icon-arrow {
    transform: rotate(180deg);
}

@media screen and (max-width: 1200px) {
    .mobile-chats-toggle-btn {
        display: flex !important;
    }
    main .chat-sidebar {
        margin-bottom: 1rem;
        background: var(--color-white);
        border-radius: var(--border-radius-2);
        box-shadow: var(--box-shadow);
        background-color: var(--color-white);
        height: auto !important; /* Allow accordion to shrink/grow freely */
    }
}
@media screen and (max-width: 768px) {
    .chat-wrapper {
        min-height: 25rem;
        height: calc(100vh - 200px);
    }
}
INNEREOF
