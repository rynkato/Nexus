<?php

class UI {

    function getHead() {
        echo "<link rel=\"stylesheet\" href=\"assets/css/main.css\">
        <link href=\"assets/css/lib/addSlider.min.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">
        <link href=\"assets/css/lib/font-fileuploader.min.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">
        <link href=\"assets/css/lib/jquery.fileuploader.min.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">
        <link href=\"assets/css/lib/jquery.mCustomScrollbar.min.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">
        <link href=\"assets/css/lib/flatpickr.min.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">
        <link href=\"assets/css/lib/fabrx-styles.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">
        <link href=\"assets/css/lib/fabrx-dark-layout.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\">
        <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.18/css/bootstrap-select.min.css\" integrity=\"sha512-ARJR74swou2y0Q2V9k0GbzQ/5vJ2RBSoCWokg4zkfM29Fb3vZEQyv0iWBMW/yvKgyHSR/7D64pFMmU8nYmbRkg==\" crossorigin=\"anonymous\" />
        <link rel=\"stylesheet\" href=\"https://pro.fontawesome.com/releases/v5.10.0/css/all.css\" integrity=\"sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p\" crossorigin=\"anonymous\"/>
        <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css\" integrity=\"sha512-aOG0c6nPNzGk+5zjwyJaoRUgCdOrfSDhmMID2u4+OIslr0GjpLKo7Xm0Ao3xmpM4T8AmIouRkqwj1nrdVsLKEQ==\" crossorigin=\"anonymous\" />";
    }

    function getScripts() {
        echo "<!-- Bootstrap -->
        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js\" integrity=\"sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==\" crossorigin=\"anonymous\"></script>
        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js\"></script>
        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.3/js/bootstrap.bundle.min.js\" integrity=\"sha512-iceXjjbmB2rwoX93Ka6HAHP+B76IY1z0o3h+N1PeDtRSsyeetU3/0QKJqGyPJcX63zysNehggFwMC/bi7dvMig==\" crossorigin=\"anonymous\"></script>
        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.18/js/bootstrap-select.min.js\" integrity=\"sha512-yDlE7vpGDP7o2eftkCiPZ+yuUyEcaBwoJoIhdXv71KZWugFqEphIS3PU60lEkFaz8RxaVsMpSvQxMBaKVwA5xg==\" crossorigin=\"anonymous\"></script>
        <!-- Bootstrap -->

        <!-- UI Kit -->
        <script src=\"assets/js/lib/html5.min.js\"></script>
        <script src=\"assets/js/lib/circle-progress.min.js\"></script>
        <script src=\"assets/js/lib/highcharts.min.js\"></script>
        <script src=\"assets/js/lib/highcharts-more.min.js\"></script>
        <script src=\"assets/js/lib/flatpickr.min.js\"></script>
        <script src=\"assets/js/lib/jquery.mCustomScrollbar.min.js\"></script>
        <script src=\"assets/js/lib/bootstrap-4-autocomplete.min.js\"></script>
        <script src=\"assets/js/lib/jquery.fileuploader.min.js\"></script>
        <script src=\"assets/js/lib/Obj.min.js\"></script>
        <script src=\"assets/js/lib/addSlider.min.js\"></script>
        <script src=\"assets/js/lib/owl.carousel.min.js\"></script>
        <script src=\"assets/js/lib/jquery.waypoints.min.js\"></script>
        <script src=\"assets/js/lib/jquery.countup.min.js\"></script>
        <script src=\"assets/js/lib/masonry.min.js\"></script>
        <script src=\"assets/js/lib/jquery.sticky.js\"></script>
        <script src=\"assets/js/lib/jquery.malihu.PageScroll2id.min.js\"></script>
        <script src=\"assets/js/lib/fabrx-scripts.js\"></script>
        <!-- UI Kit -->

        <!-- Networking -->
        <script type=\"text/javascript\" src=\"https://unpkg.com/vis-network/standalone/umd/vis-network.min.js\"></script>
        <!-- Networking -->

        <!-- Fonts -->
        <script src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js'></script>
        <!-- Fonts -->

        <!-- Nexus -->
        <script type=\"text/javascript\" src=\"assets/js/NexusNetwork.js\"></script>
        <script type=\"text/javascript\" src=\"assets/js/Modals.js\"></script>
        <script type=\"text/javascript\" src='https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js'></script>
        <!-- Nexus -->";
    }

    function getAlert($type, $message) {
        if($type === "SUCCESS") {
            return "<div class=\"alert alert-success mb-3\" role=\"alert\">
                                    <span>" . $message . "</span>
                                </div>";
        } else {
            return "<div class=\"alert alert-danger mb-3\" role=\"alert\">
                                    <span>" . $message . "</span>
                                </div>";
        }
    }

}