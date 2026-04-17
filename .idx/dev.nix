{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.jdk17
    pkgs.unzip
  ];
  idx.extensions = [
    "Dart-Code.flutter"
    "Dart-Code.dart"
  ];
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "flutter"
          "run"
          "--machine"
          "-d"
          "web-server"
          "--web-hostname"
          "0.0.0.0"
          "--web-port"
          "$PORT"
          "-t"
          "lib/main.dart"
        ];
        manager = "flutter";
      };
    };
  };
}